import React from 'react';
import { AuthContext } from '../../hook/AuthContext';
import { LoginStatus } from '../../hook/AuthReducer';
import './Home.css';

const Home = () => {
  const { state } = React.useContext(AuthContext);
  const user =
    state.status === LoginStatus.LOGGEDIN ? state.data.username : 'World';
  return <div>Hello <strong>{user}</strong>!</div>;
};

export default Home;
