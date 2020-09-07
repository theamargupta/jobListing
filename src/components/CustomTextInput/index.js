import React, { Fragment } from 'react';
import { useField } from 'formik';

const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <label htmlFor={props.id || props.name}>
        {label}
        {meta.touched && meta.error ? (
          <div className='error'> {meta.error}</div>
        ) : null}
      </label>

      <input className='input' {...field} {...props} />
    </Fragment>
  );
};

export default CustomTextInput;
