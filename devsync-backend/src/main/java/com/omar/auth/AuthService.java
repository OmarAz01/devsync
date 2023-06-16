package com.omar.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.omar.Utility.UniqueStringGenerator;
import com.omar.config.JwtService;
import com.omar.entity.RefreshTokenEntity;
import com.omar.entity.Role;
import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.service.RefreshTokenService;
import com.omar.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;


    public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {
        if (userService.findByUsername(request.getUsername()).getBody() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthenticationResponse.builder()
                    .error("Username already exists").build());
        }

        if (userService.findByEmail(request.getEmail()).getBody() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthenticationResponse.builder()
                    .error("Email already exists").build());
        }

        // Creating a new user
        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        // Saving the user
        try {
            UserDTO savedUser = userService.save(user).getBody();
            if (savedUser == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuthenticationResponse
                        .builder().error("User registration failed").build());
            }
            // Create refresh and access tokens
            String uuid = UniqueStringGenerator.generateUniqueString();
            String jwt = jwtService.generateToken(uuid);
            String refreshToken = jwtService.generateRefreshToken(uuid);
            refreshTokenService.createRefreshToken(savedUser.getUserId(), refreshToken, jwt);
            return ResponseEntity.status(HttpStatus.OK).body(AuthenticationResponse.builder()
                    .userId(savedUser.getUserId()).jwt(jwt).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuthenticationResponse
                    .builder().error("User registration failed").build());
        }
    }


    public ResponseEntity<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserEntity user = userService.findByEmail(request.getEmail()).getBody();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(AuthenticationResponse
                    .builder().error("User not found").build());
        }
        // Delete old refresh token
        refreshTokenService.deleteRefreshToken(user.getUserId());
        // get new uuid for subject in jwt
        String uuid = UniqueStringGenerator.generateUniqueString();
        String jwt = jwtService.generateToken(uuid);
        String refreshToken = jwtService.generateRefreshToken(uuid);
        refreshTokenService.createRefreshToken(user.getUserId(), refreshToken, jwt);
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword(), Collections.emptyList()));
        return ResponseEntity.status(HttpStatus.OK).body(AuthenticationResponse.builder()
                .userId(user.getUserId()).jwt(jwt).build());
    }

    public void validateToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object currentPrincipal = auth.getPrincipal();
        Long userId;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("No token found");
            return;
        }
        // if userid passed is valid
        if (currentPrincipal instanceof UserEntity) {
            UserEntity currentUser = (UserEntity) currentPrincipal;
            userId = currentUser.getUserId();
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("No user found");
            return;
        }

        String jwt = authHeader.substring(7);
        String jwtUuid = jwtService.getUuid(jwt);

        if (jwtUuid == null || !jwtService.isTokenValid(jwt, userId)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
            return;
        }

        if (jwtService.isTokenExpired(jwt)) {
            RefreshTokenEntity refreshToken = refreshTokenService.findByLastAccessTokenAndUserId(jwt, userId).getBody();
            if (refreshToken == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Refresh token not found");
                return;
            }
            if (jwtService.isTokenExpired(refreshToken.getRefreshToken())) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Refresh token expired");
                return;
            }
            String refreshUuid = jwtService.getUuid(refreshToken.getRefreshToken());
            if (!refreshUuid.equals(jwtUuid)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token not valid");
                return;
            }
            // If the refresh token is valid and not expired, create a new access token and update database with it
            String newJwt = jwtService.generateToken(refreshUuid);
            refreshTokenService.updateLastAccessToken(refreshToken.getUserId(), newJwt);
            AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                    .userId(userId).jwt(newJwt).build();
            new ObjectMapper().writeValue(response.getOutputStream(), authenticationResponse);
        } else {
            // Return the current token if it is valid and not expired
            AuthenticationResponse authenticationResponse = AuthenticationResponse.builder()
                    .userId(userId).jwt(jwt).build();
            new ObjectMapper().writeValue(response.getOutputStream(), authenticationResponse);
        }
    }

}
