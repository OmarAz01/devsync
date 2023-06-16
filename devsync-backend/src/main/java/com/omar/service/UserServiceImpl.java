package com.omar.service;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<UserDTO> findUser(Long id) {
        Optional<UserEntity> user = userRepo.findByUserId(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        UserDTO userDTO = UserDTO.convertToDTO(user.get());
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
    }

    @Override
    public ResponseEntity<Long> deleteUser(Long id) {
        Optional<UserEntity> user = userRepo.findByUserId(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        try {
            userRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<UserDTO> updateUser(Long id, UserEntity user) {
        // STILL NEEDS PROPER IMPLEMENTATION
        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingUser.get().setUsername(user.getUsername());
        existingUser.get().setPassword(passwordEncoder.encode(user.getPassword()));
        existingUser.get().setRole(user.getRole());
        try {
            UserEntity userRes = userRepo.save(existingUser.get());
            UserDTO userDTO = UserDTO.convertToDTO(userRes);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<List<UserDTO>> findUsersWithIds(List<Long> userIds) {
        Optional<List<UserDTO>> users = userRepo.findUsersWithIds(userIds);
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(users.get());
    }

    @Override
    public ResponseEntity<UserDTO> findByUsername(String username) {
        Optional<UserDTO> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(user.get());
    }

    @Override
    public ResponseEntity<UserEntity> findByEmail(String email) {
        Optional<UserEntity> user = userRepo.findByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(user.get());

    }

    @Override
    public ResponseEntity<UserDTO> save(UserEntity user) {
        try {
            UserEntity newUser = userRepo.save(user);
            UserDTO userDTO = UserDTO.convertToDTO(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
