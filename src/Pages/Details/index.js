import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firestore from '../../firebase';
import Header from '../../components/Header';
import Contentloader from '../../components/ContentLoader';
import './index.scss';

const Details = () => {
  const [state, setState] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const data = async () => {
      const citiesRef = firestore.collection('jobslist');
      const snapshot = await citiesRef.where('id', '==', parseInt(id)).get();
      snapshot.forEach((doc) => {
        setState(doc.data());
      });
    };
    data();
  }, [id]);

  return state === {} ? (
    <Contentloader />
  ) : (
    <div className='details'>
      <Header />
        <div className='container'>
        <div className='main'>
          <img src={state.logo} alt='' />
          <h1>{state.position}</h1>
          <div className='home__upper'>
            <h2>{state.company}</h2>
            <p>{state.location}</p>
          </div>
          <div className='home__lower'>
            <p>
              {state.postedAt}
            </p>
            <p>
              {state.contract}
            </p>
          </div>
          <div className='home__description'>
            <p>{state.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
