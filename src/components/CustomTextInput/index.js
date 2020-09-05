import React, { Fragment } from 'react';
import { useField } from 'formik';

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <span className='error'> {meta.error}</span>
      ) : null}
      <input className='form-input' {...field} {...props} />
    </Fragment>
  );
};

export default CustomTextInput;
