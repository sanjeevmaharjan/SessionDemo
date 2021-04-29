import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './hook/AuthContext';
import { AuthReducer, defaultAuthState, LoginStatus } from './hook/AuthReducer';
import UserPage from './page/UserPage';
import MainPage from './page/MainPage';
import { getToken } from './service/TokenStorage';

const AppRoute = () => {
  const [state, dispatch] = React.useReducer(AuthReducer, defaultAuthState);

  if (state.status === LoginStatus.NOLOGIN) {
    const token = getToken();
    if (token) {
      console.log('Old login');
      dispatch({ type: 'LOGIN_SUCCESS', token });
    }
  }

  const isLoggedIn = state.status === LoginStatus.LOGGEDIN;

  return (
    <BrowserRouter>
      <div>
        <AuthContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route path="/" component={isLoggedIn ? UserPage : MainPage} />
          </Switch>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default AppRoute;
