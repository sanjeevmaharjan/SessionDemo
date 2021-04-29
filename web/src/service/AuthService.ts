import React from 'react';
import { AuthAction } from '../hook/AuthReducer';
import { LoginModel } from '../model/LoginModel';
import { SignupModel } from '../model/SignupModel';
import { UserInfoModel } from '../model/UserInfoModel';
import { UserUpdateModel } from '../model/UserUpdateModel';
import httpClient from './ApiClient';
import { deleteToken, saveToken, Token } from './TokenStorage';

export type SignupError = {
  field: keyof SignupModel;
  message: string;
};

export type UpdateProfileError = {
  field: keyof UserUpdateModel;
  message: string;
};

const parseJwt = (token: string): Token => {
  try {
    const splitJwt = token.replace(/Bearer /, '').split('.');
    console.log(splitJwt);

    return {
      raw: token,
      header: JSON.parse(atob(splitJwt[0])),
      payload: JSON.parse(atob(splitJwt[1])),
      signature: splitJwt[2],
    };
  } catch (e) {
    console.warn(e);
    throw Error('Error parsing Jwt.');
  }
};

export const login = async (credentials: LoginModel) => {
  const response = await httpClient.post('/account/login', credentials);

  if (response && response.headers) {
    const token = response.headers['authorization'] as string;
    const jwt = parseJwt(token);
    saveToken(jwt);
    return jwt;
  }

  throw Error('Couldnt get token from response.');
};

export const logout = (dispatch: React.Dispatch<AuthAction>) => {
  deleteToken();
  dispatch({ type: 'LOGIN_CLEAR', reason: 'User Logged out' });
};

type SignupReturn =
  | { success: true; user: UserInfoModel }
  | { success: false; errors: SignupError[] };
export const signup = async (
  registerForm: SignupModel
): Promise<SignupReturn> => {
  try {
    const response = await httpClient.post('/account/create', registerForm);

    if (response && response.data) {
      console.log(response.data);
      return {
        success: true,
        user: response.data,
      };
    }

    throw Error('No Response');
  } catch (error) {
    if (error.isAxiosError && error.response.status === 400) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    }
    console.log(error);
    throw Error('Error Signing up');
  }
};

export const getUserInfo = async (): Promise<UserInfoModel> => {
  const response = await httpClient.get('/account/info');

  if (response && response.data) {
    return response.data;
  }

  throw Error('No Response');
};

type UpdateProfileReturn =
  | { success: true; user: UserInfoModel }
  | { success: false; errors: UpdateProfileError[] };
export const updateProfile = async (
  updateForm: UserUpdateModel
): Promise<UpdateProfileReturn> => {
  try {
    const response = await httpClient.post('/account/update', updateForm);
    if (response && response.data) {
      console.log(response.data);
      return {
        success: true,
        user: response.data,
      };
    }

    throw Error('No Response');
  } catch (error) {
    if (error.isAxiosError && error.response.status === 400) {
      return {
        success: false,
        errors: error.response.data.errors,
      };
    }
    console.log(error);
    throw Error('Error Signing up');
  }
};
