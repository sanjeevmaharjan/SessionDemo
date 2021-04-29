package com.session.demo.repository;

import com.session.demo.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends BaseRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);
}
