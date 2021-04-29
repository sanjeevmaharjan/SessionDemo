package com.session.demo.transport;

import java.util.Date;
import java.util.List;

public class ValidationErrorResponse {
    private Date timestamp;
    private Integer status;
    private List<ValidationError> validationErrors;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<ValidationError> getErrors() {
        return validationErrors;
    }

    public void setErrors(List<ValidationError> errors) {
        this.validationErrors = errors;
    }

    public static class ValidationError {
        private final String field;
        private final String message;

        public ValidationError(String field, String message) {
            this.field = field;
            this.message = message;
        }

        public String getField() {
            return field;
        }

        public String getMessage() {
            return message;
        }
    }
}
