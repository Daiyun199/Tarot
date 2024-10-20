import { useEffect, useState } from "react";
import "./index.scss";
import { Zodiac } from "../../model/zodiac";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { ZodiacColor } from "../../model/zodiacColor";
import ColorBox from "../../components/color_box";
import { cardMeaning } from "../../model/cardMeaning";
import AudioPlayer from "../../components/music";
function ZodiacDetail() {
  const [zodiac, setZodiac] = useState<Zodiac>();
  const { id } = useParams<{ id: string }>();
  const [zodiacColor, setZodiacColor] = useState<ZodiacColor>();
  const [listCardMeaning, setCardMeaning] = useState<cardMeaning[]>([]);
  const convertCardMeaningKeys = (data: any): cardMeaning => {
    return {
      id: data["id"],
      categoryId: data["categoryId"],
      cardId: data["ccardId"],
      meaning: data["meaning"],
      reMeaning: data["reMeaning"],
      cardName: data["cardName"],
      urlLink: data["linkUrl"],
      categoryName: data["categoryName"],
    };
  };
  interface ZodiacTranslation {
    [key: string]: string;
  }
  // function kebabToCamel(key: string): string {
  //   return key.replace(/-./g, (match) => match[1].toUpperCase());
  // }

  function convertKeysToCamelCase(obj: { [key: string]: any }): ZodiacColor {
    return {
      id: obj["id"],
      basicColor: obj["basicColor"],
      signatureColor: obj["signatureColor"],
      avoidColor: obj["avoidColor"],
    };
  }

  const zodiacTranslations: ZodiacTranslation = {
    ARIES: "Bạch Dương",
    TAURUS: "Kim Ngưu",
    GEMINI: "Song Tử",
    CANCER: "Cự Giải",
    LEO: "Sư Tử",
    VIRGO: "Xử Nữ",
    LIBRA: "Thiên Bình",
    SCORPIO: "Bọ Cạp",
    SAGITTARIUS: "Nhân Mã",
    CAPRICORN: "Ma Kết",
    AQUARIUS: "Bảo Bình",
    PISCES: "Song Ngư",
  };

  const translateZodiacName = (name: string): string => {
    return zodiacTranslations[name] || name;
  };

  const fetchZodiacs = async () => {
    try {
      const zodiaclist = await api.get(`Zodiac/${id}`);
      const processedData = zodiaclist.data;
      console.log(processedData);
      if (processedData) {
        setZodiac({
          id: processedData["id"],
          name: processedData["name"],
          imglink: processedData["imgLink"],
          description: processedData["description"],
        });
      } else {
        toast.error("Zodiac not found");
      }
    } catch (err: any) {
      toast.error(err.response.data || "An error occurred");
    }
  };
  const fetchCardMeaning = async () => {
    try {
      const response = await api.get("CardMeaning/random");
      const cardMeanings = response.data.map(convertCardMeaningKeys);
      setCardMeaning(cardMeanings);
    } catch (err: any) {
      toast.error(err.response.data);
    }
  };
  const fetchZodiacColors = async () => {
    try {
      const response = await api.get(`ZodiacColor/zodiac/${id}`);
      const zodiacColorData = response.data;
      const convertData = convertKeysToCamelCase(zodiacColorData);
      setZodiacColor(convertData);
    } catch (err: any) {
      toast.error(err.response.data || "An error occurred");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchZodiacs();
    fetchZodiacColors();
    fetchCardMeaning();
  }, [id]);
  return (
    <div className="zodiac-detail-container">
      <AudioPlayer />
      <div className="zodiac-detail-container__section1">
        <div className="zodiac-detail-container__section1__top">
          {zodiac?.name}
        </div>
        <div className="zodiac-detail-container__section1__bottom">
          <div className="zodiac-detail-container__section1__bottom__left">
            <div className="zodiac-detail-container__section1__bottom__left__top">
              <h1>Giới Thiệu</h1>
            </div>
            <div className="zodiac-detail-container__section1__bottom__left__bottom">
              <p>{zodiac?.description}</p>
            </div>
          </div>
          <div className="zodiac-detail-container__section1__bottom__right">
            <img src={zodiac?.imglink} alt="" />
          </div>
        </div>
      </div>
      <div className="zodiac-detail-container__section2">
        <div className="zodiac-detail-container__section2__top">
          <h1>Màu sắc của {translateZodiacName(zodiac?.name ?? "")}</h1>
        </div>
        <div className="zodiac-detail-container__section2__bottom">
          <div className="zodiac-detail-container__section2__bottom__item">
            <p>Màu sắc cơ bản</p>
            <ColorBox color={zodiacColor?.basicColor ?? ""} />
          </div>
          <div className="zodiac-detail-container__section2__bottom__item">
            <p>Màu sắc đặc trưng</p>
            <ColorBox color={zodiacColor?.signatureColor ?? ""} />
          </div>
          <div className="zodiac-detail-container__section2__bottom__item">
            <p>Mắc sắc cần tránh</p>
            <ColorBox color={zodiacColor?.avoidColor ?? ""} />
          </div>
        </div>
      </div>
      <div className="zodiac-detail-container__section3">
        <div className="zodiac-detail-container__section3__top">
          <h1>Thông điệp tuần mới</h1>
        </div>
        <div className="zodiac-detail-container__section3__bottom">
          {listCardMeaning.map((card) => (
            <img
              key={card.id}
              src={card.urlLink}
              alt={card.cardName}
              width={300}
            />
          ))}
        </div>
      </div>
      <div className="zodiac-detail-container__section4">
        <h1>Ý Nghĩa</h1>
        {listCardMeaning.map((card) => (
          <p>{card.meaning}</p>
        ))}
      </div>
    </div>
  );
}

export default ZodiacDetail;
