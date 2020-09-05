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
      {state.position}
    </div>
  );
};

export default Details;
