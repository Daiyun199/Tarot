// src/context/AudioContext.tsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import OhMyMy from "../asset/musicwithoutlyrics.mp3"; // Đảm bảo đường dẫn đúng tới file âm thanh

interface AudioContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Khởi tạo với null
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Âm thanh mặc định là tắt

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(OhMyMy);
      audioRef.current.loop = true;
      audioRef.current.muted = isMuted;
    }

    // Dừng âm thanh khi component unmount
    return () => {
      audioRef.current?.pause();
    };
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = false; // Bật âm thanh
    setIsMuted(false); // Cập nhật trạng thái
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Lỗi phát âm thanh:", error);
      });
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPlaying,
        togglePlay,
        toggleMute,
        isMuted,
        playAudio,
        pauseAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio phải được sử dụng trong AudioProvider");
  }
  return context;
};
