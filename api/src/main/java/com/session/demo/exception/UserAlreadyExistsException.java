package com.session.demo.exception;

import java.util.List;

public class UserAlreadyExistsException extends RuntimeException {
    private final String field;

    public UserAlreadyExistsException(String field) {
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
