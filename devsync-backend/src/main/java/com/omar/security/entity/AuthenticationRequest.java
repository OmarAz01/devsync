package com.omar.security.entity;

import lombok.*;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
