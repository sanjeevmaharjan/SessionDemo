import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Login from '../component/LoginForm/Login';
import Signup from '../component/Signup/Signup';

const MainPageRoute = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="*">
      <div>
        Link is not available at this time. Go to <Link to="/">Home</Link>.
      </div>
    </Route>
  </Switch>
);

export default MainPageRoute;
