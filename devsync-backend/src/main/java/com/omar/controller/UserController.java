package com.omar.controller;

import com.omar.dto.EmailChangeDTO;
import com.omar.dto.PasswordChangeDTO;
import com.omar.dto.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        return userService.findUser(id);
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable("username") String username) {
        return userService.findByUsername(username);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/{id}/image")
    public ResponseEntity<UserDTO> updateUserImage(@PathVariable("id") Long id, @RequestBody String image) {
        return userService.updateUserImage(id, image);
    }

    @PutMapping("/{id}/bio")
    public ResponseEntity<UserDTO> updateUserBio(@PathVariable("id") Long id, @RequestBody String bio) {
        System.out.println("bio: " + bio);
        return userService.updateUserBio(id, bio);
    }

    @PutMapping("/{id}/level")
    public ResponseEntity<UserDTO> updateUserLevel(@PathVariable("id") Long id, @RequestBody String level) {
        return userService.updateUserLevel(id, level);
    }

    @PutMapping("/{id}/skill")
    public ResponseEntity<UserDTO> updateUserSkill(@PathVariable("id") Long id, @RequestBody String skill) {
        return userService.updateUserSkill(id, skill);
    }

    @PostMapping("/{id}/changePassword")
    public ResponseEntity<String> changePassword(@PathVariable("id") Long id, @RequestBody PasswordChangeDTO passwordChangeDTO) {
        return userService.changePassword(id, passwordChangeDTO);
    }

    @PostMapping("/{id}/changeEmail")
    public ResponseEntity<String> changeEmail(@PathVariable("id") Long id, @RequestBody EmailChangeDTO emailChangeDTO) {
        return userService.changeEmail(id, emailChangeDTO);
    }

}

