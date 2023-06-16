package com.omar.config;

import com.omar.entity.RefreshTokenEntity;
import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.repo.RefreshTokenRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${signin.key}")
    private String signInKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${jwt.refresh.expiration}")
    private long jwtRefreshExpiration;

    private final RefreshTokenRepo refreshTokenRepo;

    public JwtService(RefreshTokenRepo refreshTokenRepo) {
        this.refreshTokenRepo = refreshTokenRepo;
    }

    public String getUuid(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = extractAllClaims(jwt);
            return claimsResolver.apply(claims);
        } catch (ExpiredJwtException e) {
            Claims claim = e.getClaims();
            return claimsResolver.apply(claim);
        }

    }

    public String generateToken(String uuid) {
        return generateToken(new HashMap<>(), uuid);
    }

    public String generateRefreshToken(String uuid) {
        return buildToken(new HashMap<>(), uuid, jwtRefreshExpiration);
    }


    public String generateToken(Map<String, Object> extraClaims, String uuid) {
        return buildToken(extraClaims, uuid, jwtExpiration);
    }

    private String buildToken(Map<String, Object> extraClaims, String uuid, Long expiration) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(uuid)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String jwt, Long userId) {
        String uuid = getUuid(jwt);
        Optional<RefreshTokenEntity> refreshTokenEntity = refreshTokenRepo.findByLastAccessTokenAndUserId(jwt, userId);
        if (refreshTokenEntity.isPresent()) {
            String refresh = refreshTokenEntity.get().getRefreshToken();
            String refreshUuid = getUuid(refresh);
            if (uuid.equals(refreshUuid)) {
                return true;
            }
        }
        return false;
    }

    public boolean isTokenExpired(String jwt) {
        if (extractExp(jwt).before(new Date())) {
            return true;
        } else {
            return false;
        }

    }

    private Date extractExp(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }


    public Claims extractAllClaims(String jwt) {
        try {
            return Jwts
                    .parserBuilder().setSigningKey(getSignInKey()).build()
                    .parseClaimsJws(jwt).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }

    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(signInKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}