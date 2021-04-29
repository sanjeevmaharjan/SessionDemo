package com.session.demo.service;

import com.session.demo.entity.UserEntity;
import com.session.demo.exception.UserAlreadyExistsException;
import com.session.demo.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<UserEntity> getByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsername(usernameOrEmail)
                .or(() -> userRepository.findByEmail(usernameOrEmail));
    }

    @Override
    public UserEntity createUser(UserEntity newUser) {
        var optionalUserWithUsername = userRepository.findByUsername(newUser.getUsername());
        if (optionalUserWithUsername.isPresent()) {
            throw new UserAlreadyExistsException("username");
        } else {
            var optionalUserWithEmail = userRepository.findByEmail(newUser.getEmail());
            if (optionalUserWithEmail.isPresent()) {
                throw new UserAlreadyExistsException("email");
            }
        }

        final var encodedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(encodedPassword);
        return userRepository.save(newUser);
    }

    @Override
    public UserEntity deleteUser(String username) {
        var userEntity = getByUsernameOrEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username does not exist."));
        userRepository.delete(userEntity);
        return userEntity;
    }

    @Override
    public UserEntity updateUser(UserEntity updateUser) {
        var existingUser = userRepository.findByUsername(updateUser.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username does not exist."));

        if (updateUser.getEmail() != null && !updateUser.getEmail().isBlank()) {
            if (!updateUser.getEmail().equals(existingUser.getEmail())
                    && userRepository.findByEmail(updateUser.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("email");
            }
            else if (updateUser.getEmail() != null && !updateUser.getEmail().isBlank()) {
                existingUser.setEmail(updateUser.getEmail());
            }
        }


        if (updateUser.getName() != null && !updateUser.getName().isBlank()) {
            existingUser.setName(updateUser.getName());
        }

        if (updateUser.getPassword() !=null && !updateUser.getPassword().equals(existingUser.getPassword())) {
            final var encodedPassword = passwordEncoder.encode(updateUser.getPassword());
            existingUser.setPassword(encodedPassword);
        }

        userRepository.save(existingUser);
        return existingUser;
    }
}
