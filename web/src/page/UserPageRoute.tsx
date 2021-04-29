import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from '../component/Home/Home';
import Profile from '../component/Profile/Profile';
import UpdateProfile from '../component/UpdateProfile/UpdateProfile';

const HomePageRoute = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/edit" component={UpdateProfile} />
    <Route path="*">
      <div>
        Link is not available at this time. Go to <Link to="/">Home Page</Link>.
      </div>
    </Route>
  </Switch>
);

export default HomePageRoute;
