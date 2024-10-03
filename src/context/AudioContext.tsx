// src/context/AudioContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import OhMyMy from "../asset/musicwithoutlyrics.mp3";

interface AudioContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(new Audio(OhMyMy));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.loop = true; // Âm thanh lặp lại
      audio.muted = isMuted; // Cập nhật trạng thái tắt tiếng

      // Tự động phát âm thanh
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true); // Cập nhật trạng thái phát âm thanh
        } catch (error) {
          console.error("Lỗi phát âm thanh:", error);
        }
      };

      playAudio(); // Gọi hàm phát âm thanh

      // Xử lý dừng âm thanh
      return () => {
        audio.pause();
      };
    }
  }, [isMuted]); // Chỉ cần cập nhật isMuted khi thay đổi

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPlaying,
        togglePlay,
        toggleMute,
        isMuted,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
