package com.omar.service;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.entity.UserIdsDTO;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface UserService {
    UserDTO findUser(Integer id);
    void deleteUser(Integer id);
    UserEntity updateUser(Integer id, UserEntity user);
    List<UserDTO> findUsersWithIds(List<Integer> userIds);
}
