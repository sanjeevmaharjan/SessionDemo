import { Token } from '../service/TokenStorage';

export type Auth = {
  username: string;
  issuer: string;
  expiry: number;
};

export enum LoginStatus {
  NOLOGIN,
  LOGGEDIN,
  LOGGINGIN,
  LOGINERROR,
}

export type AuthState =
  | { status: LoginStatus.LOGGEDIN; data: Auth }
  | { status: LoginStatus.LOGGINGIN; data: undefined }
  | { status: LoginStatus.LOGINERROR; data: string }
  | { status: LoginStatus.NOLOGIN; data?: string };

export type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS', token: Token }
  | { type: 'LOGIN_FAILED', error: string }
  | { type: 'LOGIN_CLEAR', reason: 'User Logged out' | 'Login Expired' | 'User Signed Up'};

export const defaultAuthState: AuthState = {
  status: LoginStatus.NOLOGIN,
  data: undefined,
};

export const AuthReducer = (
  initialState: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        status: LoginStatus.LOGGINGIN,
        data: undefined,
      };
    case 'LOGIN_SUCCESS':
      const { token } = action;
      return {
        status: LoginStatus.LOGGEDIN,
        data: {
          username: token.payload.sub,
          expiry: token.payload.exp,
          issuer: token.payload.iss,
        },
      };
    case 'LOGIN_CLEAR':
      return {
        status: LoginStatus.NOLOGIN,
        data: action.reason
      };
    default:
      return {
        status: LoginStatus.LOGINERROR,
        data: action.error || 'Invalid Login State.',
      };
  }
};
