import React from 'react';
import { FormProps } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AuthContext } from '../../hook/AuthContext';
import { useBind } from '../../hook/useBind';
import { SignupModel } from '../../model/SignupModel';
import { signup } from '../../service/AuthService';
import SignupForm, { SignupErrors } from './SignupForm';

const Signup = () => {
  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();

  const username = useBind('');
  const email = useBind('');
  const name = useBind('');
  const password = useBind('');
  const repeatPassword = useBind('');

  const [isSigningUp, setSigningUp] = React.useState(false);
  const [errors, setErrors] = React.useState<SignupErrors>(undefined);

  const bindings = {
    username,
    email,
    name,
    password,
    repeatPassword,
  };

  const onSubmit: FormProps['onSubmit'] = (e) => {
    if (repeatPassword.value !== password.value) {
      setErrors({
        repeatPassword: 'Passwords do not match'
      });
      e.preventDefault();
      return;
    }

    const registration: SignupModel = {
      username: username.value as string,
      email: email.value as string,
      name: name.value as string,
      password: password.value as string,
    };

    setSigningUp(true);
    setErrors(undefined);
    signup(registration)
      .then((response) => {
        setSigningUp(false);
        if (response.success) {
          dispatch({ type: 'LOGIN_CLEAR', reason: 'User Signed Up' });
          history.replace('/');
        } else {
          const errors: SignupErrors = {};
          response.errors.forEach((error) => {
            errors[error.field] = error.message;
          });
          setErrors(errors);
        }
      })
      .catch((error) => {
        console.log(error);
        setSigningUp(false);
      });
    e.preventDefault();
  };

  return (
    <SignupForm
      bindings={bindings}
      errors={errors}
      onSubmit={onSubmit}
      isSigningUp={isSigningUp}
    />
  );
};

export default Signup;
