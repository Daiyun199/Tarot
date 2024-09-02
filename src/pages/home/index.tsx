import React from "react";
import "./index.scss";
function Home() {
  return (
    <div className="home">
      <div className="home__section1">
        <div className="home__section1__top">MEOWGIC</div>
        <div className="home__section1__middle">
          <div className="home__section1__middle__left">
            <img
              src="https://i.imgur.com/IheDtoa.png"
              title="icon"
              width={230}
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
      <div className="home__section2"></div>
      <div className="home__section3"></div>
      <div className="home__section4"></div>
      <div className="home__section5"></div>
    </div>
  );
}

export default Home;
