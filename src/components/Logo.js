import React from 'react';
import logoImage from '../img/SMART-YUGAM-FINAL-Logo.png';

const Logo = ({ size = 80 }) => {
  return (
    <img 
      src={logoImage} 
      alt="Smart Yugam Academy" 
      className={`h-${size/4} w-auto object-contain`}
    />
  );
};

export default Logo;