import React, { useEffect } from 'react';
import firestore, { auth } from '../../firebase';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jobsListGen } from '../../redux/actionGenerator';

const Home = () => {
  const { jobs, loading } = useSelector(
    ({ jobs: { jobs, loading } }) => ({
      jobs: jobs,
      loading: loading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    firestore.collection('jobslist').onSnapshot((snapshot) => {
      dispatch(jobsListGen(snapshot.docs.map((doc) => doc.data())));
    });
  };
  useEffect(() => {
    console.log(jobs[0], loading);
    for (const i in jobs[0]) {
      console.log(jobs[0][i].role);
    }
  }, [jobs, loading]);
  return (
    <div>
      Home
      <button onClick={() => auth.signOut()}>SignOut</button>
      <button onClick={() => handleClick()}>Show</button>
    </div>
  );
};

export default Home;
