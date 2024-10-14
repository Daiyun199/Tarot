// src/components/WelcomeScreen.tsx
import React, { useState } from "react";
import "./index.scss";
import { useAudio } from "../../context/AudioContext"; // Import hook useAudio

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const { playAudio } = useAudio(); // Sử dụng hook useAudio

  const handleClick = () => {
    setAnimate(true);
    playAudio(); // Bắt đầu phát âm thanh khi nhấn nút
    setTimeout(() => {
      onContinue();
    }, 1000); // Thời gian trùng với CSS transition
  };

  return (
    <div className={`welcome-screen ${animate ? "animate" : ""}`}>
      <div className="welcome-screen__overlay">
        <div className="welcome-screen__content">
          <h1>Welcome to My World</h1>
          <button
            className="button"
            onClick={handleClick}
            aria-label="Enter the website"
          >
            Enter
          </button>
        </div>
      </div>
      <div className="welcome-screen__panel left"></div>
      <div className="welcome-screen__panel right"></div>
    </div>
  );
};

export default WelcomeScreen;
