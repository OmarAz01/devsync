package com.omar.service;

import com.omar.dto.EmailChangeDTO;
import com.omar.dto.PasswordChangeDTO;
import com.omar.dto.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity<UserDTO> updateUserImage(Long id, String image) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        if (existingUser.get().getImageUri() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        existingUser.get().setImageUri(image);
        try {
            UserEntity userRes = userRepo.save(existingUser.get());
            UserDTO userDTO = UserDTO.convertToDTO(userRes);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<UserDTO> findByUsername(String username) {
        Optional<UserEntity> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        UserDTO userDTO = UserDTO.convertToDTO(user.get());
        return ResponseEntity.status(HttpStatus.OK).body(userDTO);
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

    @Override
    public ResponseEntity<UserDTO> updateUserBio(Long id, String bio) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingUser.get().setBio(bio);
        try {
            UserEntity userRes = userRepo.save(existingUser.get());
            UserDTO userDTO = UserDTO.convertToDTO(userRes);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<UserDTO> updateUserLevel(Long id, String level) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingUser.get().setLevel(level);
        try {
            UserEntity userRes = userRepo.save(existingUser.get());
            UserDTO userDTO = UserDTO.convertToDTO(userRes);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<UserDTO> updateUserSkill(Long id, String skill) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingUser.get().setSkill(skill);
        try {
            UserEntity userRes = userRepo.save(existingUser.get());
            UserDTO userDTO = UserDTO.convertToDTO(userRes);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<String> changePassword(Long id, PasswordChangeDTO passwordChangeDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        String oldPassword = passwordChangeDTO.getOldPassword();
        String newPassword = passwordChangeDTO.getNewPassword();
        if (!passwordEncoder.encode(oldPassword).equals(existingUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect");
        }
        existingUser.get().setPassword(passwordEncoder.encode(newPassword));
        try {
            userRepo.save(existingUser.get());
            return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<String> changeEmail(Long id, EmailChangeDTO emailChangeDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(id)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        String password = emailChangeDTO.getPassword();
        String newEmail = emailChangeDTO.getEmail();
        if (!passwordEncoder.encode(password).equals(existingUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is incorrect");
        }
        if (userRepo.findByEmail(newEmail).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        existingUser.get().setEmail(newEmail);
        try {
            userRepo.save(existingUser.get());
            return ResponseEntity.status(HttpStatus.OK).body("Email changed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
