import React from "react";
import "./index.scss";

interface ReadingPackage {
  title: string;
  price: string;
  description: string;
  image: string; 
}

interface ReaderProfileProps {
  name: string;
  introduction: string;
  experience: string[];
  packages: ReadingPackage[];
  image: string;
  likes: number;
  ratings: number;
  expertise: string[];
}

function ReaderProfile({
  name,
  introduction,
  experience,
  packages,
  image,
  likes,
  ratings,
  expertise,
}: ReaderProfileProps) {
  return (
    <div className="reader-profile">
      <header className="page-header">
        <h1>READER PROFILE</h1>
      </header>
      <div className="profile-details">
        <img src={image} alt={`${name}'s profile`} className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-likes">Lượt yêu thích: {likes}</p>
        <p className="profile-ratings"> 
        <span className="ratings-text">Lượt đánh giá:</span>    
          {Array.from({ length: 5 }, (_, index) =>
            index < ratings ? "★" : "☆"
          ).join("")}
        </p>
        <p className="profile-expertise">Chuyên môn: {expertise.join(", ")}</p>
      </div>
      <div className="profile-information">
        <section className="introduction">
          <h2 className="section-title">Giới thiệu</h2>
          <p className="section-content">{introduction}</p>
        </section>
        <section className="experience">
          <h2 className="section-title">Kinh nghiệm</h2>
          <ul className="experience-list">
            {experience.map((item, index) => (
              <li key={index} className="experience-item">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="packages">
          <h2 className="section-title">Các gói trải bài</h2>
          {packages.map((pkg, index) => (
            <div key={index} className="package">
              <div className="package-content">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="package-image"
                />{" "}
                {/* Hình ảnh gói trải bài */}
                <div className="package-info">
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-price">Giá: {pkg.price}</p>
                  <p className="package-description">{pkg.description}</p>
                  <button className="book-button">ĐẶT LỊCH NGAY</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

// Data
const sampleData: ReaderProfileProps = {
  name: "Nonglin",
  introduction:
    '"Với nhiều năm kinh nghiệm trong lĩnh vực tarot, Candy được biết đến như một tarot reader uy tín và tâm huyết. Uyn đã hỗ trợ hàng nhiều khách hàng tìm thấy sự hướng dẫn và cân bằng trong cuộc sống thông qua những là bài Tarot, mang đến sự bình an và hiểu biết sâu sắc về bản thân."',
  experience: [
    "3 năm tổ chức Workshop chia sẻ kiến thức cơ bản về Tarot",
    "Có lượng người theo dõi trên nền tảng mạng xã hội về Tarot",
    "3 năm kinh nghiệm xem Tarot và Tealeaf",
  ],
  packages: [
    {
      title: "Gói trải bài cho câu hỏi đơn",
      price: "20.000 VND",
      description:
        "Reader sẽ nhận câu hỏi, đưa ra câu trả lời chi tiết và cụ thể về vấn đề mà bạn đang quan tâm. Số lượng câu trả lời tương ứng với số lượng câu hỏi lẻ mà bạn đăng kí. Gói trải bài sẽ giúp bạn giải quyết những thắc mắc mà bạn đang gặp phải và đưa ra lời khuyên nhanh nhất cho vấn đề đó.",
      image: "https://i.imgur.com/IheDtoa.png",
    },
    {
      title: "Gói trải bài 3 câu hỏi",
      price: "50.000 VND",
      description:
        "Khác với câu hỏi đơn, gói trải bài theo chủ đề sẽ giúp bạn giải đáp theo chủ đề (tình cảm, sức khỏe, học tập,...). Gói bài này sẽ giúp người coi đi sâu vào 1 vấn đề cụ thể, Reader sẽ đưa ra những dự đoán, những gợi ý, những lời khuyên cho chủ đề mà bạn chọn. Từ đó, giúp bạn có hướng suy nghĩ và giải quyết chính xác hơn.",
      image: "https://i.imgur.com/IheDtoa.png",
    },
    {
      title: "Gói trải bài 6 câu hỏi",
      price: "100.000 VND",
      description:
        "Gói bài sẽ cung cấp cái nhìn tổng quan, những thuận lợi và khó khăn cho tuần mới của bạn. Reader sẽ dự đoán và đưa ra lời khuyên cho những sự kiện có thể xảy ra với bạn, giúp bạn chuẩn bị trước các tình huống hay định hướng cho những cơ hội mới cho mà bản thân chưa nhận ra.",
      image: "https://i.imgur.com/IheDtoa.png",
    },
    {
      title: "Gói trải bài theo chủ đề",
      price: "100.000 VND",
      description:
        "Gói bài sẽ cung cấp cái nhìn tổng quan, những thuận lợi và khó khăn cho tuần mới của bạn. Reader sẽ dự đoán và đưa ra lời khuyên cho những sự kiện có thể xảy ra với bạn, giúp bạn chuẩn bị trước các tình huống hay định hướng cho những cơ hội mới cho mà bản thân chưa nhận ra.",
      image: "https://i.imgur.com/IheDtoa.png",
    },
  ],
  image: "https://example.com/image.jpg",
  likes: 123,
  ratings: 456,
  expertise: ["Tarot", "Tealeaf", "Oracle"],
};

function App() {
  return <ReaderProfile {...sampleData} />;
}

export default App;
