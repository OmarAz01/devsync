package com.omar.dto;

import com.omar.entity.UserEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String email;
    private String username;
    private String imageUri;
    private String skill;
    private String level;

    public static UserDTO convertToDTO(UserEntity user) {
        return new UserDTO(
                user.getUserId(),
                user.getEmail(),
                user.getUsername(),
                user.getImageUri(),
                user.getSkill(),
                user.getLevel()
        );
    }

    public static List<UserDTO> convertToDTO(List<UserEntity> users) {
        List<UserDTO> userDTOs = new ArrayList<>();
        for (UserEntity user : users) {
            UserDTO userDTO = new UserDTO(
                    user.getUserId(),
                    user.getEmail(),
                    user.getUsername(),
                    user.getImageUri(),
                    user.getSkill(),
                    user.getLevel()
            );
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }
}

