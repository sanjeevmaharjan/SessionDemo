import React from 'react';
import { defaultAuthState, AuthState, AuthAction } from './AuthReducer';

export type AuthContextObject = {
  state: AuthState,
  dispatch: React.Dispatch<AuthAction>
}

const defaultAuth: AuthContextObject = {
  state: defaultAuthState,
  dispatch: () => {} 
}

export const AuthContext = React.createContext(defaultAuth);
