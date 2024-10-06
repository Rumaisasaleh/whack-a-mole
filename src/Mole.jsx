import React from 'react';
import './Mole.css';


const Mole = ({ isActive, whack }) => {
  return (
    <div className="mole-container" onClick={whack}>
      {isActive ? (
        <img
          src="/mole.png" 
          alt="Mole"
          className="mole-img"
        />
      ) : (
        <div className="hole"></div> 
      )}
    </div>
  );
};

export default Mole;
