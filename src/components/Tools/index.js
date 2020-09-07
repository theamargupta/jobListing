import React from 'react';

function Language({ data, index, removeLanguage }) {
  return (
    <div className='inputfield'>
      <label></label>
      {data}
      {removeLanguage && (
        <button onClick={() => removeLanguage(index)}>x</button>
      )}
    </div>
  );
}

export default Language;
