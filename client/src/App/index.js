import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from '../Pages/Home';
import LandingPage from '../Pages/Landing';
// import UsersPage from '../Pages/Users';
import PicturesPage from '../Pages/Pictures';
import AccountPage from '../Pages/Account';
import AdminPage from '../Pages/Admin';
import SignInPage from '../Pages/SignIn';

import PopulatePage from '../Pages/Populate';

import * as ROUTES from '../constants/routes';


const App = () => (
  <Router>
    <div>
      {/* <Navigation /> */}

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.SIGNIN } component={SignInPage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.POPULATE} component={PopulatePage} />
      {/* <Route exact path={ROUTES.USERS} component={UsersPage} /> */}
      <Route exact path={ROUTES.PICTURES} component={PicturesPage} />
      {/* <Route exact path={ROUTES.ADMINPAGE} component={AdminPage} /> */}
        

    </div>
  </Router>
);

export default App;