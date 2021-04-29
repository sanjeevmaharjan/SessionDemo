import React from 'react';
import LoginForm, { LoginFormBindings } from './LoginForm';
import { useBind } from '../../hook/useBind';
import { FormProps } from 'react-bootstrap';
import { login } from '../../service/AuthService';
import { AuthContext } from '../../hook/AuthContext';
import { LoginStatus } from '../../hook/AuthReducer';
import { Variant } from 'react-bootstrap/esm/types';
import { LoginModel } from '../../model/LoginModel';
import { useHistory } from 'react-router';

const Login = () => {
  const { state, dispatch } = React.useContext(AuthContext);
  const history = useHistory();

  const identity = useBind('');
  const secret = useBind('');

  const bindings: LoginFormBindings = {
    identity,
    secret,
  };

  let message = '';
  let messageVariant: Variant = 'primary';
  if (state.status === LoginStatus.LOGINERROR) {
    messageVariant = 'danger';
    message = state.data;
  } else if (state.status === LoginStatus.NOLOGIN) {
    messageVariant = 'info';
    message = state.data || '';
  }

  const isLoggingIn = state.status === LoginStatus.LOGGINGIN;

  const onSubmit: FormProps['onSubmit'] = (e) => {
    if (
      typeof identity.value === 'string' &&
      typeof secret.value === 'string'
    ) {
      dispatch({ type: 'LOGIN_REQUEST' });

      const credentials: LoginModel = {
        identity: identity.value,
        secret: secret.value,
      };
      
      login(credentials)
        .then((token) => {
          console.log('logged in');
          dispatch({ type: 'LOGIN_SUCCESS', token });
          history.push('/');
        })
        .catch((error) => {
          if (error && error.response && error.response.status === 403) {
            dispatch({ type: 'LOGIN_FAILED', error: 'Invalid Credentials' });
          } else {
            dispatch({ type: 'LOGIN_FAILED', error: 'Login Error: ' + error });
          }
        });
    }
    e.preventDefault();
  };

  return (
    <LoginForm
      bindings={bindings}
      onSubmit={onSubmit}
      message={message}
      messageVariant={messageVariant}
      isLoggingIn={isLoggingIn}
    />
  );
};

export default Login;
