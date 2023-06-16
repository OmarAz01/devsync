package com.omar.service;

import com.omar.entity.RefreshTokenEntity;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface RefreshTokenService {

    ResponseEntity<Long> deleteRefreshToken(Long userId);

    ResponseEntity<Long> logoutUser(Long userId);

    ResponseEntity<String> getRefreshToken(Long userId);

    ResponseEntity<String> getLastAccessToken(Long userId);

    ResponseEntity<RefreshTokenEntity> findByLastAccessTokenAndUserId(String lastAccessToken, Long userId);


    ResponseEntity<RefreshTokenEntity> createRefreshToken(Long userId, String refreshToken, String lastAccessToken);

    ResponseEntity<String> updateLastAccessToken(Long userId, String newJwt);
}
