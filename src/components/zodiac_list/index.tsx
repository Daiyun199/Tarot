import React, { useEffect, useRef, useState } from "react";
import { Zodiac } from "../../model/zodiac";
import { toast } from "react-toastify";
import "./index.scss";
interface ZodiacListProps {
  zodiacs?: Zodiac[];
}
function ZodiacList(zodiacslist: ZodiacListProps) {
  const [zodiacs, setZodiacs] = useState<Zodiac[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageStyle, setImageStyle] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const handleImageClick = (imgSrc: string, index: number) => {
    const imgElement = imgRefs.current[index];

    if (imgElement) {
      const rect = imgElement.getBoundingClientRect();
      setImageStyle({
        width: rect.width,
        height: rect.height,
      });
      setSelectedImage(imgSrc);
    }
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
    setImageStyle(null);
  };

  const fetchZodiacs = async () => {
    try {
      const hardcodedZodiacs: Zodiac[] = [
        { id: 1, name: "AQUARIUS", imglink: "https://i.imgur.com/7VVZlqK.png" },
        { id: 2, name: "ARIES", imglink: "https://i.imgur.com/Bk9AYgh.png" },
        {
          id: 3,
          name: "CAPRICORN",
          imglink: "https://i.imgur.com/S38VSNh.png",
        },
        { id: 4, name: "CANCER", imglink: "https://i.imgur.com/zdW2igg.png" },
        { id: 5, name: "TAURUS", imglink: "https://i.imgur.com/hFztC8D.png" },
        { id: 6, name: "LEO", imglink: "https://i.imgur.com/A7BjaVh.png" },
        {
          id: 7,
          name: "SAGITTARIUS",
          imglink: "https://i.imgur.com/egG0zIm.png",
        },
        { id: 8, name: "SCORPIO", imglink: "https://i.imgur.com/n2SICoH.png" },
        { id: 9, name: "PISCES", imglink: "https://i.imgur.com/soXSVjJ.png" },
        { id: 10, name: "GEMINI", imglink: "https://i.imgur.com/dJhTln6.png" },
        { id: 11, name: "LIBRA", imglink: "https://i.imgur.com/TDpHTGn.png" },
        { id: 12, name: "VIRGO", imglink: "https://i.imgur.com/UirSNrz.png" },
      ];
      setZodiacs(hardcodedZodiacs);
    } catch (err) {
      toast.error(err.response?.data || "An error occurred");
    }
  };
  useEffect(() => {
    fetchZodiacs();
  }, []);
  return (
    <div className="zodiac-list">
      {zodiacs.map((zodiac, index) => (
        <img
          key={zodiac.name}
          src={zodiac.imglink}
          alt={zodiac.name}
          ref={(el) => (imgRefs.current[index] = el as HTMLImageElement)}
          onClick={() => handleImageClick(zodiac.imglink, index)}
        />
      ))}

      {selectedImage && imageStyle && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal__content">
            <img
              src={selectedImage}
              alt="Selected"
              className="modal__image"
              style={{
                width: imageStyle.width,
                height: imageStyle.height,
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="modal__select">Select</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZodiacList;
