import React, { useEffect, useState } from 'react';
import firestore from '../../firebase';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jobsListGen } from '../../redux/actionGenerator';
import { useHistory } from 'react-router-dom';
import CircularLoader from '../../components/circularLoader';
import Header from '../../components/Header';
import { motion } from 'framer-motion';
import './index.scss';

const Home = () => {
  const [input, setInput] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
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

  // Handle the change
  const onChange = (e) => {
    setInput(e.target.value);
  };

  const list = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 },
  };
  let filterjob = jobs.filter((job) => {
    return (
      job.position.toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
      job.level.toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
      job.role.toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
      job.contract.toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
      job.location.toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
      job.company.toLowerCase().indexOf(input.toLowerCase()) !== -1 ||
      // job.languages[0].toLowerCase().indexOf(input) !== -1 ||
      job.languages.includes(input) ||
      (job.tools.length > 0 &&
        job.tools[0].toLowerCase().indexOf(input.toLowerCase()) !== -1)
    );
  });
  return loading ? (
    <CircularLoader />
  ) : (
    <div className='home'>
      <Header />

      <motion.div
        className='home__main'
        initial='hidden'
        animate='visible'
        variants={list}
      >
        <input
          type='text'
          className='home__input-field'
          onChange={onChange}
          placeholder='Search for job'
        />
        {filterjob.map((data) => (
          <motion.div
            className='home__mainFc'
            key={data.id}
            variants={item}
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`details/${data.id}`)}
          >
            <div className='home__left'>
              <div className='home__left1'>
                <img src={data.logo} alt='' />
              </div>
              <div className='home__left2'>
                <div className='home__upper'>
                  <h5>{data.company}</h5>
                  {data.new && <button>New!</button>}
                  {data.featured && <button>Featured</button>}
                </div>
                <h3>{data.position}</h3>
                <div className='home__lower'>
                  <p>
                    {data.postedAt} {'   .'}
                  </p>
                  <p>
                    {data.contract} {'   .'}
                  </p>
                  <p>{data.location}</p>
                </div>
              </div>
            </div>
            <div className='home__right'>
              <button>{data.role}</button>
              <button>{data.level}</button>
              {data.tools &&
                data.tools.map((value, index) => (
                  <button key={index}>{value}</button>
                ))}
              {data.languages &&
                data.languages.map((value, index) => (
                  <button key={index}>{value}</button>
                ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
