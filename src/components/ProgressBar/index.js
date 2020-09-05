import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

const ProgressBar = ({ file, setUrl }) => {
  const { url, progress } = useStorage(file); //, error, progress
  useEffect(() => {
    if (url) {
      setUrl(url);
    }
  }, [url, setUrl]);
  return (
    <div>
      {file.name} {progress}
    </div>
  );
};

export default ProgressBar;
