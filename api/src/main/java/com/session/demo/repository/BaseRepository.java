package com.session.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.lang.NonNull;

import java.util.List;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends CrudRepository<T, ID> {

    @Override
    @NonNull
    List<T> findAll();
}
