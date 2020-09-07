import React, { useState } from 'react';

function Language({ data, index, removeLanguage }) {
  return (
    <div className='todo'>
      {data}
      <button onClick={() => removeLanguage(index)}>x</button>
    </div>
  );
}

function LanguageForm({ addLanguage }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addLanguage(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [language, setLanguage] = useState(['django', 'Python', 'React']);

  const addLanguage = (text) => {
    const newLanguage = [...language, text];
    setLanguage(newLanguage);
  };

  const removeLanguage = (index) => {
    const newLanguage = [...language];
    newLanguage.splice(index, 1);
    setLanguage(newLanguage);
  };

  return (
    <div className='app'>
      <div className='todo-list'>
        {language.map((data, index) => (
          <Language
            key={index}
            index={index}
            data={data}
            removeLanguage={removeLanguage}
          />
        ))}
        <LanguageForm addLanguage={addLanguage} />
      </div>
    </div>
  );
}

export default App;
