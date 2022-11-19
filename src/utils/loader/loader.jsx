import React from 'react';
import loaderStyles from './loader.module.css';

const Loader = () => {
  return (
    <div className={loaderStyles.container}>
      <div className={loaderStyles.loader}>
          <div></div>
          <div></div>
      </div>
    </div>
  );
}

export default Loader;