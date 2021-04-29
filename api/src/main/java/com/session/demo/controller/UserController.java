package com.session.demo.controller;

import com.session.demo.entity.UserEntity;
import com.session.demo.service.UserService;
import com.session.demo.transport.UserInfoResponse;
import com.session.demo.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Type;
import java.util.List;

//@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    public UserController(UserService userService) {
        this.userService = userService;
        modelMapper = ModelMapperFactory.getMapper();
    }

    @GetMapping
    public List<UserInfoResponse> getUsers() {
        List<UserEntity> userEntities = userService.getAll();
        return modelMapper.map(userEntities, TargetTypes.LIST_OF_USER_INFO_DTO);
    }

    @GetMapping("/{username}")
    public UserInfoResponse getUser(@PathVariable String username) {
        UserEntity userEntity = userService.getByUsernameOrEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not available."));
        return modelMapper.map(userEntity, UserInfoResponse.class);
    }

    static class TargetTypes {
        static final Type LIST_OF_USER_INFO_DTO = (new TypeToken<List<UserInfoResponse>>() {
        }).getType();
    }
}
