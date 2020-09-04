import React, { Suspense } from 'react';
import AppRoute from '../router';
import CircularLoader from '../components/circularLoader';

export default () => (
  <Suspense fallback={<CircularLoader />}>
    <AppRoute />
  </Suspense>
);
