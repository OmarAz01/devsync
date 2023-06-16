package com.omar.service;

import com.omar.entity.RefreshTokenEntity;
import com.omar.entity.UserEntity;
import com.omar.repo.RefreshTokenRepo;
import com.omar.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepo refreshTokenRepo;
    private final UserRepo userRepo;

    @Override
    public ResponseEntity<Long> deleteRefreshToken(Long userId) {
        Optional<RefreshTokenEntity> refreshToken = refreshTokenRepo.findByUserId(userId);
        if (refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(userId);
        }
        try {
            refreshTokenRepo.deleteById(userId);
            return ResponseEntity.status(HttpStatus.OK).body(userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Override
    public ResponseEntity<Long> logoutUser(Long userId) {
        // still need to implement
        Optional<UserEntity> user = userRepo.findByUserId(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        refreshTokenRepo.deleteById(userId);
        return null;
    }

    @Override
    public ResponseEntity<String> getRefreshToken(Long userId) {
        Optional<String> refreshToken = refreshTokenRepo.findRefreshTokenByUserId(userId);
        if (refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(refreshToken.get());
    }

    @Override
    public ResponseEntity<String> getLastAccessToken(Long userId) {
        Optional<String> lastAccessToken = refreshTokenRepo.findLastAccessTokenByUserId(userId);
        if (lastAccessToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(lastAccessToken.get());
    }

    @Override
    public ResponseEntity<RefreshTokenEntity> findByLastAccessTokenAndUserId(String lastAccessToken, Long userId) {
        Optional<RefreshTokenEntity> refreshToken = refreshTokenRepo.findByLastAccessTokenAndUserId(lastAccessToken, userId);
        if (refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(refreshToken.get());
    }

    @Override
    public ResponseEntity<RefreshTokenEntity> createRefreshToken(Long userId, String refreshToken, String lastAccessToken) {
        Optional<UserEntity> user = userRepo.findByUserId(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        RefreshTokenEntity refreshTokenEntity = new RefreshTokenEntity();
        refreshTokenEntity.setUser(user.get());
        refreshTokenEntity.setRefreshToken(refreshToken);
        refreshTokenEntity.setLastAccessToken(lastAccessToken);

        try {
            refreshTokenRepo.save(refreshTokenEntity);
            return ResponseEntity.status(HttpStatus.OK).body(refreshTokenEntity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<String> updateLastAccessToken(Long userId, String newJwt) {
        Optional<UserEntity> user = userRepo.findByUserId(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        try {
            refreshTokenRepo.updateLastAccessToken(userId, newJwt);
            return ResponseEntity.status(HttpStatus.OK).body(newJwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
