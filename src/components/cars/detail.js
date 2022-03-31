import React, { useEffect } from 'react';
import NavigationPanel from './navLink';

const Detail = () => {
  const adjustSize = () => {
    const nav = document.querySelector('.nav-wrapper');
    const h = window.innerHeight;
    nav.style.height = `${h}px`;
  };
  useEffect(() => adjustSize(), []);
  return (
    <NavigationPanel />
  );
};

export default Detail;
