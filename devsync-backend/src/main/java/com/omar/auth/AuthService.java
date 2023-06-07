package com.omar.auth;

import com.omar.config.JwtService;
import com.omar.entity.Role;
import com.omar.entity.UserEntity;
import com.omar.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepo.findByUsername(request.getUsername()).isPresent()) {
            return AuthenticationResponse.builder().jwt("Username already exists").build();
        }
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder().jwt("Email already exists").build();
        }
        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepo.save(user);

        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder().userId(user.getUserId()).jwt(jwt).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserEntity user = userRepo.findByUsername(request.getEmail()).orElseThrow();
        
        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder().userId(user.getUserId()).jwt(jwt).build();
    }

    public Boolean validate(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return false;
        }
        String jwt = authorization.substring(7);
        return jwtService.isTokenExpired(jwt);
    }
}
