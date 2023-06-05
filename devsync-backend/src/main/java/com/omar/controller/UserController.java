package com.omar.controller;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.entity.UserIdsDTO;
import com.omar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable("id") Integer id) {
        return userService.findUser(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
    }

    @PutMapping("/update/{id}")
    public UserEntity updateUser(@PathVariable("id") Integer id, @RequestBody UserEntity user) {
        return userService.updateUser(id, user);
    }
    @PostMapping("/userforpost")
    public List<UserDTO> getUsersWithIds(@RequestBody UserIdsDTO userIds) {
        List<Integer> ids = userIds.getUserIds();
        return userService.findUsersWithIds(ids);
    }

}
