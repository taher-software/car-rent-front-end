import React, { useEffect } from 'react';
import NavigationPanel from './navLink';
import './detail.css';

const Detail = () => {
  const adjustSize = () => {
    const nav = document.querySelector('.nav-wrapper');
    const h = window.innerHeight;
    nav.style.height = `${h}px`;
  };
  useEffect(() => adjustSize(), []);
  return (
    <div className="detail-wrapper">
      <NavigationPanel />
    </div>
  );
};

export default Detail;
