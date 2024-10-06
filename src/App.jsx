// App.js

import React, { useState, useEffect } from 'react';
import './App.css'; 
import Button from 'react-bootstrap/Button';
import Mole from './Mole.jsx';
import HighScoreModal from './HighScoreModal.jsx'; 

const GAME_DURATION = 60; 

const App = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [gameOver, setGameOver] = useState(false);  
  const [showModal, setShowModal] = useState(false);

  const whackSound = new Audio('/whack.mp3'); 

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 9);
        setActiveIndex(randomIndex);
      }, 1000);

      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(timer);
      };
    } else {
      setGameOver(true);
      setActiveIndex(null);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', score);
        setShowModal(true); // Show modal when new high score is achieved
      }
    }
  }, [timeLeft, score, highScore]);

  const resetGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
  };

  const whackMole = (index) => {
    if (index === activeIndex && !gameOver) {
      setScore(score + 1);
      setActiveIndex(null);
      whackSound.play(); 
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <h1 className='text-primary'>Whack-a-Mole</h1>
      <p className='mt-3'><i>Get ready to whack some moles! </i></p>
      <div className="score-container">
        <h2>Score: {score}</h2>
        <h1 className='time' style={{ color: timeLeft <= 10 ? 'red' : '#4b4b4b' }}>
          {timeLeft}s
        </h1>
        <h2>High Score: {highScore}</h2>
      </div>

      {gameOver ? (
        <Button onClick={resetGame}>Restart Game</Button>
      ) : (
        <div className="grid">
          {moles.map((_, index) => (
            <Mole
            key={index}
            isActive={index === activeIndex}
            whack={() => whackMole(index)}/>
          ))}
        </div>
      )}
       {showModal && <HighScoreModal score={score} onClose={handleCloseModal} />} {/* Render modal */}
    </div>
  );
  
};

export default App;