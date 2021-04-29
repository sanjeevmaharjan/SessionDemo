package com.session.demo.transport;

import javax.validation.constraints.NotBlank;

public class UserLoginRequest {
    @NotBlank
    private String identity;
    private String secret;

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }
}
