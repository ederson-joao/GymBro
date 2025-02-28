import React, { useState } from 'react';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const screens = [
    {
      content: (
        <div className="logo-container">
          <img src="./images/gymbro.png" alt="GymBro" />
        </div>
      ),
      button: (
        <button onClick={() => setCurrentScreen(1)}>
          <FaArrowRight />
        </button>
      ),
    },
    {
      content: (
        <div className="message-container">
          <img src="./images/strong-arm.png" alt="strong-arm" />
          <h2>Transforme seu corpo</h2>
          <p>Comece hoje mesmo a mudar sua vida!</p>
        </div>
      ),
      button: (
        <button onClick={() => setCurrentScreen(2)}>
          <FaArrowRight />
        </button>
      ),
    },
    {
      content: (
        <div className="message-container">
          <img src="./images/lifting-weight.png" alt="strong-arm" />
          <h2>Treine com consistência</h2>
          <p>Os resultados virão com dedicação!</p>
        </div>
      ),
      button: (
        <button onClick={() => setCurrentScreen(3)}>
          <FaArrowRight />
        </button>
      ),
    },
    {
      content: (
        <div className="message-container">
          <img src="./images/conquest.png" alt="strong-arm" />
          <h2>Pronto para começar?</h2>
          <p>Vamos construir uma versão melhor de você!</p>
        </div>
      ),
      button: (
        <button onClick={() => navigate('/login')}>
          <FaPlay /> Começar
        </button>
      ),
    },
  ];

  return (
    <div className={`carousel ${screens[currentScreen]}`}>
      <div className="content">{screens[currentScreen].content}</div>
      <div className="button-container">{screens[currentScreen].button}</div>
      <div className="progress-dots">
        {screens.map((_, index) => (
          <span
            key={index}
            className={index === currentScreen ? 'active' : ''}
            onClick={() => setCurrentScreen(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;