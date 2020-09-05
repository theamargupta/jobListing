import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firestore from '../../firebase';

const Details = () => {
  const { id } = useParams();
  useEffect(() => {
    const data = async () => {
      const citiesRef = firestore.collection('jobslist');
      const snapshot = await citiesRef.where('id', '==', parseInt(id)).get();
      snapshot.forEach((doc) => {
        console.log(doc.data());
      });
      console.log(typeof parseInt(id));
    };
    data();
  }, [id]);

  return <div>Details {id}</div>;
};

export default Details;
