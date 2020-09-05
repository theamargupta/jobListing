import React, { useEffect } from 'react';
import firestore, { auth } from '../../firebase';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jobsListGen } from '../../redux/actionGenerator';
import { useHistory } from 'react-router-dom';
import CircularLoader from '../../components/circularLoader';
import Header from '../../components/Header';
import './index.scss';

const Home = () => {
  const { jobs, loading } = useSelector(
    ({ jobs: { jobs, loading } }) => ({
      jobs: jobs,
      loading: loading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    firestore
      .collection('jobslist')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        dispatch(jobsListGen(snapshot.docs.map((doc) => doc.data())));
      });
  }, [dispatch]);
  return loading ? (
    <CircularLoader />
  ) : (
    <div className='home'>
      <Header />
      Home
      <button onClick={() => auth.signOut()}>SignOut</button>
      <div>
        {jobs.map((data) => (
          <p key={data.id} onClick={() => history.push(`details/${data.id}`)}>
            {data.id} <span> {data.position}</span>
          </p>
        ))}
      </div>
      <button onClick={() => history.push('/creation')}>creation</button>
    </div>
  );
};

export default Home;
