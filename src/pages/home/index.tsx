import "./index.scss";
import ChatPopup from "../chat/chatPopup";
import AudioPlayer from "../../components/music";
import { useEffect, useState } from "react";
import WelcomeScreen from "../../components/welcome_screen";

function Home() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userData");
    if (isLoggedIn) {
      setShowWelcome(false);
    }
  }, []);
  const handleContinue = () => {
    setShowWelcome(false);
  };
  return (
    <div className="home">
      {showWelcome && <WelcomeScreen onContinue={handleContinue} />}
      <AudioPlayer isLoginPage={true} />
      <div className="home__section1">
        <div className="home__section1__top">
          <img src="https://i.imgur.com/Kx2IQRt.png" alt="" width={300} />
        </div>
        <div className="home__section1__middle">
          <div className="home__section1__middle__left">
            <img
              src="https://i.imgur.com/IheDtoa.png"
              title="icon"
              width={350}
            ></img>
          </div>
          <div className="home__section1__middle__right">
            <span className="home__section1__middle__right__title">
              Giới thiệu
            </span>
            <p className="home__section1__middle__right__info">
              "Chào mừng bạn đến với MEOWGIC, nơi chúng tôi giúp bạn khám phá
              những bí ẩn của cuộc sống qua Tarot! Tarot là bộ bài gồm 78 lá,
              mỗi lá chứa đựng những biểu tượng và thông điệp sâu sắc, giúp bạn
              tìm hiểu rõ hơn về tình yêu, công việc, hay con đường phát triển
              bản thân. Tại đây, bạn sẽ được trải nghiệm những buổi đọc bài đầy
              cảm hứng, mang đến cái nhìn mới mẻ và giúp bạn kết nối với chính
              mình. Hãy để chúng tôi cùng bạn khám phá những câu trả lời mà bạn
              đang tìm kiếm và hướng dẫn bạn trên con đường phía trước!"
            </p>
          </div>
        </div>
        <div className="home__section1__bottom">
          <div className="home__section1__bottom__box"></div>
          <div className="home__section1__bottom__box"></div>
          <div className="home__section1__bottom__box"></div>
          <div className="home__section1__bottom__box"></div>
        </div>
      </div>
      <div className="home__section2">
        <div className="home__section2__top">
          <img src="https://i.imgur.com/K0bsyz7.png" alt="" width={400} />
        </div>
        <div className="home__section2__bottom">
          <div className="home__section2__bottom__box">
            <div className="home__section2__bottom__box__img"></div>
            <div className="home__section2__bottom__box__title">
              Tarot <br /> Hằng ngày
            </div>
          </div>
          <div className="home__section2__bottom__box">
            <div className="home__section2__bottom__box__img"></div>
            <div className="home__section2__bottom__box__title">
              Tarot <br /> 12 cung hoàng đạo
            </div>
          </div>
          <div className="home__section2__bottom__box">
            <div className="home__section2__bottom__box__img"></div>
            <div className="home__section2__bottom__box__title">
              Tarot <br /> Trải bài chuyên sâu
            </div>
          </div>
        </div>
      </div>
      <div className="home__section3">
        <div className="home__section3__top">CHỦ ĐỀ BÓI TAROT</div>
        <div className="home__section3__middle">
          <div className="home__section3__middle__box">
            <div className="home__section3__middle__box__img"></div>
            <div className="home__section3__middle__box__info">
              Tình cảm <br />
              Tài chính
            </div>
          </div>
          <div className="home__section3__middle__box">
            <div className="home__section3__middle__box__img"></div>
            <div className="home__section3__middle__box__info">
              Học tập <br /> Công việc
            </div>
          </div>
          <div className="home__section3__middle__box">
            <div className="home__section3__middle__box__img"></div>
            <div className="home__section3__middle__box__info">
              Giải quyết xung đột <br /> Khám phá bản thân
            </div>
          </div>
        </div>
        <div className="home__section3__bottom">Truy Cập Ngay</div>
      </div>
      <div className="home__section4">
        <div className="home__section4__top">
          <div className="home__section4__top__title">Các Câu Hỏi Hay Gặp</div>
        </div>
        <div className="home__section4__middle">
          <div className="home__section4__middle__content">
            <p>Trải bài Tarot của Meowgic phù hợp với đối tượng nào</p>
            <p>
              Trải bài Tarot có thể giúp bản thân nhận ra cơ hội, các mối quan
              hệ mới của mình hay không
            </p>
            <p>
              Làm thế nào để tìm kiếm và lựa chọn dịch vụ trải bài phù hợp với
              bản thân
            </p>
            <p>
              Trải bài Tarot có phù hợp với mọi người không hay chỉ phù hợp với
              những người tin vào tâm linh
            </p>
          </div>
        </div>
        <div className="home__section4__bottom">About us</div>
      </div>
      <ChatPopup />
    </div>
  );
}

export default Home;
