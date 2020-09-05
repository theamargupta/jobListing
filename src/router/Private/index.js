import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../../firebase';
import { authState } from '../../redux/actionGenerator';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import circularLoader from '../../components/circularLoader';

const PrivateRoute = (props) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(
    ({ user: { user, isLoading, error } }) => ({
      user: user,
      isLoading: isLoading,
      error: error,
    }),
    shallowEqual
  );
  const { component: RouteComponent, ...rest } = props;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(authState(user));
    });
  }, [dispatch]);
  return isLoading ? (
    <circularLoader />
  ) : (
    <Route
      {...rest}
      render={(routeProps) =>
        !!user.displayName ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/'} />
        )
      }
    />
  );
};

export default PrivateRoute;
