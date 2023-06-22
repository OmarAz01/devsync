package com.omar.service;

import com.omar.dto.UserDTO;
import com.omar.entity.UserEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<UserDTO> findUser(Long id);

    ResponseEntity<Long> deleteUser(Long id);

    ResponseEntity<UserDTO> updateUser(Long id, UserEntity user);

    ResponseEntity<List<UserDTO>> findUsersWithIds(List<Long> userIds);

    ResponseEntity<UserDTO> findByUsername(String username);

    ResponseEntity<UserEntity> findByEmail(String email);

    ResponseEntity<UserDTO> save(UserEntity user);

}
