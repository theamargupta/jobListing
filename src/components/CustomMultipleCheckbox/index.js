import React, { Fragment } from 'react';
import { useField, Field } from 'formik';

const CustomMultipleCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField(props, 'checkbox');
  return (
    <Fragment>
      <label className='checkbox'>
        <Field type='checkbox' {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </Fragment>
  );
};

export default CustomMultipleCheckBox;
