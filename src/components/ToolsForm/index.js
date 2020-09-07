import React, { useState, Fragment } from 'react';

function LanguageForm({ addLanguage }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addLanguage(value);
    setValue('');
  };

  return (
    <Fragment>
      <label>Langauge</label>
      <input
        type='text'
        className='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </Fragment>
  );
}
export default LanguageForm;
