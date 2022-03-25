import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const alert = useLocation();
  return (
    <div className="message-alert"><p>{alert}</p></div>
  );
};

export default Home;
