package com.omar.controller;

import com.omar.dto.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        return userService.findUser(id);
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
        return userService.updateUserBio(id, bio);
    }

}
