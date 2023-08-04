package com.omar.service;

import com.omar.dto.EmailChangeDTO;
import com.omar.dto.PasswordChangeDTO;
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

    ResponseEntity<UserDTO> updateUserSkill(Long id, String skill);

    ResponseEntity<String> changePassword(Long id, PasswordChangeDTO passwordChangeDTO);

    ResponseEntity<String> changeEmail(Long id, EmailChangeDTO emailChangeDTO);
}
