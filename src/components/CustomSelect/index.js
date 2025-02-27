import React, { Fragment } from 'react';
import { useField } from 'formik';

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Fragment>
      <label htmlFor={props.id || props.name}>
        {label}
        {meta.touched && meta.error ? (
          <div className='error'>{meta.error}</div>
        ) : null}
      </label>
      <div className='custom_select'>
        <select {...field} {...props} />
      </div>
    </Fragment>
  );
};

export default CustomSelect;
