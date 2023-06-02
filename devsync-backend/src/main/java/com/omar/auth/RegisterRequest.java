package com.omar.auth;

import com.omar.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    private String email;
    private String username;
    private String password;
    private Role role;
}
