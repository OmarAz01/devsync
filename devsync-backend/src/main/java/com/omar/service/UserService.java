package com.omar.service;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import org.springframework.security.core.userdetails.User;

public interface UserService {
    UserDTO findUser(Integer id);
    void deleteUser(Integer id);
    UserEntity updateUser(Integer id, UserEntity user);

}
