import React from "react";
import "./index.scss";
import ChatPopup from "../chat/chatPopup";

function Home() {
  return (
    <div className="home">
      <div className="home__section1">
        <div className="home__section1__top">
          <img src="https://i.imgur.com/Kx2IQRt.png" alt="" width={300} />
        </div>
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
            <div className="home__section2__bottom__box__info">
              "Hãy bắt đầu ngày mới với dịch vụ bói Tarot hằng ngày của chúng
              tôi! Nhận những gợi ý tinh tế và lời khuyên hữu ích để hướng dẫn
              bạn qua mọi thăng trầm trong cuộc sống."
            </div>
          </div>
          <div className="home__section2__bottom__box">
            <div className="home__section2__bottom__box__img"></div>
            <div className="home__section2__bottom__box__title">
              Tarot <br /> 12 cung hoàng đạo
            </div>
            <div className="home__section2__bottom__box__info">
              "Đắm chìm trong thế giới của 12 cung hoàng đạo với dịch vụ bói
              Tarot của chúng tôi! Khám phá những thông điệp cá nhân hóa từ các
              lá bài để nhận định rõ hơn về tương lai và định hướng cuộc sống
              của bạn."
            </div>
          </div>
          <div className="home__section2__bottom__box">
            <div className="home__section2__bottom__box__img"></div>
            <div className="home__section2__bottom__box__title">
              Tarot <br /> Trải bài chuyên sâu
            </div>
            <div className="home__section2__bottom__box__info">
              "Khám phá những bí ẩn của cuộc sống với dịch vụ trải bài Tarot
              chuyên sâu của chúng tôi, bao gồm Tarot, Oracle và tealeaf. Nhận
              những dự đoán rõ ràng và gợi ý thực tế để giúp bạn đưa ra những
              quyết định quan trọng trong cuộc sống."
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
