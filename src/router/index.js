import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
const Home = React.lazy(() => import('../Pages/Home'));
const Login = React.lazy(() => import('../Pages/Login'));
const Signup = React.lazy(() => import('../Pages/Signup'));
const Creation = React.lazy(() => import('../Pages/Creation'));
const Details = React.lazy(() => import('../Pages/Details'));
const NotFound = React.lazy(() => import('../Pages/NotFound'));

const AppRouter = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/creation' component={Creation} />
        <Route exact path='/details/:id' component={Details} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
export default AppRouter;
