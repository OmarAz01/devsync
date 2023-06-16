package com.omar.controller;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.entity.UserIdsDTO;
import com.omar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("id") Long id, @RequestBody UserEntity user) {
        return userService.updateUser(id, user);
    }

    @PostMapping("/userforpost")
    public ResponseEntity<List<UserDTO>> getUsersWithIds(@RequestBody UserIdsDTO userIds) {
        return userService.findUsersWithIds(userIds.getUserIds());
    }
}
