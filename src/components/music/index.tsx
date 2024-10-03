/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/music/AudioPlayer.tsx
import React from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useAudio } from "../../context/AudioContext";

const AudioPlayer: React.FC<{ isLoginPage?: boolean }> = ({ isLoginPage }) => {
  const { toggleMute, isMuted } = useAudio();

  // Styles cho nút âm lượng
  const muteButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: isLoginPage ? "auto" : "100px",
    left: isLoginPage ? "20px" : "auto",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  return (
    <>
      <button
        style={muteButtonStyle}
        onClick={toggleMute}
        aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
      </button>
    </>
  );
};

export default AudioPlayer;
