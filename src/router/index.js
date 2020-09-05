import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
// import Header from '../components/Header';
import PrivateRoute from './Private';
const Header = lazy(() => import('../components/Header'));
const Home = lazy(() => import('../Pages/Home'));
const Login = lazy(() => import('../Pages/Login'));
const Signup = lazy(() => import('../Pages/Signup'));
const Creation = lazy(() => import('../Pages/Creation'));
const Details = lazy(() => import('../Pages/Details'));
const NotFound = lazy(() => import('../Pages/NotFound'));

const AppRouter = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute exact path='/creation' component={Creation} />
        <PrivateRoute exact path='/details/:id' component={Details} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
export default AppRouter;
