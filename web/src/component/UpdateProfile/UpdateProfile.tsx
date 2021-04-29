import React from 'react';
import { FormProps } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useBind } from '../../hook/useBind';
import { UserInfoModel } from '../../model/UserInfoModel';
import { UserUpdateModel } from '../../model/UserUpdateModel';
import { getUserInfo, updateProfile } from '../../service/AuthService';
import UpdateProfileForm, { UpdateProfileErrors } from './UpdateProfileForm';

let defaultUser: UserInfoModel = {
  username: '',
  email: '',
  name: '',
};

const UpdateProfile = () => {
  const history = useHistory();

  const { setValue: setEmail, ...email } = useBind('', true);
  const { setValue: setName, ...name } = useBind('', true);
  const password = useBind('');
  const repeatPassword = useBind('');

  const [isUpdating, setUpdating] = React.useState(true);
  const [errors, setErrors] = React.useState<UpdateProfileErrors>(undefined);

  const bindings = {
    email,
    name,
    password,
    repeatPassword,
  };

  React.useEffect(() => {
    const onGetUserInfo = () => {
      let unmounted = false;

      getUserInfo()
        .then((userInfo) => {
          if (!unmounted) {
            setEmail && setEmail(userInfo.email);
            setName && setName(userInfo.name);
            setUpdating(false);
            defaultUser = userInfo;
          }
        })
        .catch((error) => {
          alert(error);
        });

      return () => {
        unmounted = true;
      };
    };

    onGetUserInfo();
  }, [setEmail, setName]);

  const onSubmit: FormProps['onSubmit'] = (e) => {
    if (repeatPassword.value !== password.value) {
      setErrors({
        repeatPassword: 'Passwords do not match',
      });
      e.preventDefault();
      return;
    }

    const updatedUserInfo: UserUpdateModel = {};

    if (defaultUser.email !== email.value) {
      updatedUserInfo.email = email.value as string;
    }

    if (defaultUser.name !== name.value) {
      updatedUserInfo.name = name.value as string;
    }

    const passwordString = password.value as string;
    if (passwordString.length > 0) {
      updatedUserInfo.password = passwordString;
    }

    setUpdating(true);
    setErrors(undefined);
    if (Object.keys(updatedUserInfo).length > 0) {
      updateProfile(updatedUserInfo)
        .then((response) => {
          setUpdating(false);
          if (response.success) {
            history.replace('/profile');
          } else {
            const errors: UpdateProfileErrors = {};
            response.errors.forEach((error) => {
              errors[error.field] = error.message;
            });
            setErrors(errors);
          }
        })
        .catch((error) => {
          console.log(error);
          setUpdating(false);
        });
    } else {
      setUpdating(false);
    }

    e.preventDefault();
  };

  return (
    <UpdateProfileForm
      bindings={bindings}
      errors={errors}
      onSubmit={onSubmit}
      isUpdating={isUpdating}
    />
  );
};

export default UpdateProfile;
