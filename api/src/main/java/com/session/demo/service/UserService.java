package com.session.demo.service;

import com.session.demo.entity.UserEntity;
import com.session.demo.exception.UserAlreadyExistsException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserEntity> getAll();
    Optional<UserEntity> getByUsernameOrEmail(String username);
    UserEntity createUser(UserEntity newUser) throws UserAlreadyExistsException;
    UserEntity deleteUser(String username);
    UserEntity updateUser(UserEntity updateUser);
}
