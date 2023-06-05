package com.omar.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {
    private Long userId;
    private String email;
    private String username;
    private String imageUri;
    private String skill;
    private String level;

    public static List<UserDTO> convertToDTO(List<UserEntity> users) {
        List<UserDTO> userDTOs = new ArrayList<>();
        for (UserEntity user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserId(user.getUserId());
            userDTO.setEmail(user.getEmail());
            userDTO.setUsername(user.getUsername());
            userDTO.setImageUri(user.getImageUri());
            userDTO.setSkill(user.getSkill());
            userDTO.setLevel(user.getLevel());
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

}
