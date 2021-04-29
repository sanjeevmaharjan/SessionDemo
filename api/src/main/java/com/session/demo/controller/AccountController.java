package com.session.demo.controller;

import com.session.demo.entity.UserEntity;
import com.session.demo.service.UserService;
import com.session.demo.transport.UserCreateRequest;
import com.session.demo.transport.UserInfoResponse;
import com.session.demo.transport.UserUpdateRequest;
import com.session.demo.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/account")
public class AccountController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public AccountController(UserService userService) {
        this.userService = userService;
        modelMapper = ModelMapperFactory.getMapper();
    }

    @GetMapping("/info")
    public UserInfoResponse getUser(Principal principal) {
        String username = principal.getName();
        UserEntity userEntity = userService.getByUsernameOrEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not available."));
        return modelMapper.map(userEntity, UserInfoResponse.class);
    }

    @PostMapping("/create")
    public ResponseEntity<UserInfoResponse> createUser(@Valid @RequestBody UserCreateRequest newUser) {
        UserEntity newUserEntity = modelMapper.map(newUser, UserEntity.class);
        final var user = userService.createUser(newUserEntity);
        final var createdUser = modelMapper.map(user, UserInfoResponse.class);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public UserInfoResponse getUser(@Valid @RequestBody UserUpdateRequest updateUser, Principal principal) {
        String username = principal.getName();
        final var userEntity = modelMapper.map(updateUser, UserEntity.class);
        userEntity.setUsername(username);

        userService.updateUser(userEntity);
        return modelMapper.map(userEntity, UserInfoResponse.class);
    }
}
