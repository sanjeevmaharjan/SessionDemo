package com.session.demo.transport;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

public class UserUpdateRequest {
    @Email
    private String email;

    @Size(max = 32, min = 3)
    private String name;

    @Size(max = 32, min = 3)
    private String password;

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
