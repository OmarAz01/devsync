package com.omar.auth;

import lombok.*;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
