import React from 'react';
import { UserInfoModel } from '../../model/UserInfoModel';
import { getUserInfo } from '../../service/AuthService';
import ProfileView from './ProfileView';

const defaultUser: UserInfoModel = {
  username: '',
  email: '',
  name: '',
};

const Profile = () => {
  const [userInfo, setUserInfo] = React.useState(defaultUser);

  const onGetUserInfo = () => {
    let unmounted = false;

    getUserInfo()
      .then((userInfo) => {
        if (!unmounted) {
          setUserInfo(userInfo);
        }
      })
      .catch((error) => {
        alert(error);
      });

    return () => {
      unmounted = true;
    };
  };

  React.useEffect(() => {
    onGetUserInfo();
  }, []);

  return <ProfileView userInfo={userInfo} />;
};

export default Profile;
