package com.omar.service;

import com.omar.dto.UserDTO;
import com.omar.entity.UserEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<UserDTO> findUser(Long id);

    ResponseEntity<Long> deleteUser(Long id);

    ResponseEntity<UserDTO> updateUserImage(Long id, String image);

    ResponseEntity<UserDTO> findByUsername(String username);

    ResponseEntity<UserEntity> findByEmail(String email);

    ResponseEntity<UserDTO> save(UserEntity user);

    ResponseEntity<UserDTO> updateUserBio(Long id, String bio);

    ResponseEntity<UserDTO> updateUserLevel(Long id, String level);
}
