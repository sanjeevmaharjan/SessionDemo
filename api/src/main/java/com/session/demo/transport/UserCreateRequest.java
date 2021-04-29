package com.session.demo.transport;

import javax.validation.constraints.*;

public class UserCreateRequest {
    @Size(max = 8, min = 3)
    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotNull
    @Size(max = 32, min = 3)
    private String name;

    @NotNull
    @Size(max = 32, min = 3)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
