package com.session.demo.exception;

import com.session.demo.transport.ValidationErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ValidationErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        var body = new ValidationErrorResponse();
        body.setTimestamp(new Date());
        body.setStatus(HttpStatus.BAD_REQUEST.value());

        var errors = Collections.singletonList(
                new ValidationErrorResponse.ValidationError(e.getField(), "Already Exists"));
        body.setErrors(errors);

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @Override
    @NonNull
    public ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            @NonNull HttpHeaders headers, HttpStatus status,
            @NonNull WebRequest request
    ) {
        var body = new ValidationErrorResponse();
        body.setTimestamp(new Date());
        body.setStatus(status.value());

        List<ValidationErrorResponse.ValidationError> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(x -> new ValidationErrorResponse.ValidationError(x.getField(), x.getDefaultMessage()))
                .collect(Collectors.toList());
        body.setErrors(errors);

        return new ResponseEntity<>(body, headers, status);
    }
}
