import React, { useEffect, useRef, useState } from "react";
import { Zodiac } from "../../model/zodiac";
import { toast } from "react-toastify";
import "./index.scss";

import api from "../../config/axios";
import { Link } from "react-router-dom";
interface ZodiacListProps {
  zodiacs?: Zodiac[];
}
function ZodiacList(zodiacslist: ZodiacListProps) {
  const [zodiacs, setZodiacs] = useState<Zodiac[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imageStyle, setImageStyle] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const handleImageClick = (imgSrc: string, index: number, id: string) => {
    const imgElement = imgRefs.current[index];

    if (imgElement) {
      const rect = imgElement.getBoundingClientRect();
      setImageStyle({
        width: rect.width,
        height: rect.height,
      });
      setSelectedImage(imgSrc);
      setSelectedId(id);
    }
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
    setImageStyle(null);
    setSelectedId(null);
  };

  const fetchZodiacs = async () => {
    try {
      const zodiaclist = await api.get("Zodiac");
      console.log(zodiaclist.data);
      const processedData = zodiaclist.data.map((item: any) => ({
        id: item["id"],
        name: item["name"],
        imglink: item["img-link"],
        description: item["description"],
      }));
      console.log(processedData);
      setZodiacs(processedData);
    } catch (err) {
      toast.error(err.response?.data || "An error occurred");
    }
  };
  useEffect(() => {
    fetchZodiacs();
  }, []);
  return (
    <div className="zodiac-list">
      {Array.isArray(zodiacs) &&
        zodiacs.map((zodiac, index) => (
          <img
            key={zodiac.name}
            src={zodiac.imglink}
            alt={zodiac.name}
            ref={(el) => (imgRefs.current[index] = el as HTMLImageElement)}
            onClick={() => handleImageClick(zodiac.imglink, index, zodiac.id)}
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
            <div className="modal__select">
              <Link
                to={`${selectedId}`}
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  color: "inherit",
                }}
              >
                Select
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZodiacList;
