package com.session.demo.util;

import org.modelmapper.ModelMapper;

public abstract class ModelMapperFactory {

    private ModelMapperFactory() { }

    private static ModelMapper modelMapper;

    public static ModelMapper getMapper() {
        if (modelMapper != null) {
            return modelMapper;
        }

        modelMapper = new ModelMapper();
        return modelMapper;
    }
}
