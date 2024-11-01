import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../config/axios";

interface ReadingPackage {
  id: string; 
  name: string;
  price: string;
  description: string;
  imgUrl: string;
}

interface ReaderProfileProps {
  name: string;
  introduction: string;
  experience: string[];
  packages: ReadingPackage[];
  imgUrl: string;
  likes: number;
  ratings: number;
  expertise?: string[];
}

function ReaderProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ReaderProfileProps | null>(null);

  const handleBooking = (id: string) => {
    navigate(`/calendar/${id}`); 
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accountResponse = await api.get(`Account/detail-info/${id}`);
        const tarotServiceResponse = await api.get(`TarotService/Reader/${id}`);
        console.log(tarotServiceResponse);

        const accountData = accountResponse.data;
        const tarotPackages = tarotServiceResponse.data;

        // Set different content for "Nonglin" and "Candy"
        const name = accountData.name === "NONGLIN" ? "Nonglin" : "Candy";
        const introduction =
          accountData.name === "NONGLIN"
            ? '"Với nhiều năm kinh nghiệm trong lĩnh vực tarot, Candy được biết đến như một tarot reader uy tín và tâm huyết. Uyn đã hỗ trợ hàng nhiều khách hàng tìm thấy sự hướng dẫn và cân bằng trong cuộc sống thông qua những là bài Tarot, mang đến sự bình an và hiểu biết sâu sắc về bản thân."'
            : "Candy là một chuyên gia tarot với kiến thức sâu rộng và khả năng lắng nghe, giúp khách hàng tìm ra câu trả lời cho những vấn đề trong cuộc sống.";
        const experience =
          accountData.name === "NONGLIN"
            ? [
                "3 năm tổ chức Workshop chia sẻ kiến thức cơ bản về Tarot",
                "Có lượng người theo dõi trên nền tảng mạng xã hội về Tarot",
                "3 năm kinh nghiệm xem Tarot và Tealeaf",
              ]
            : [
                "5 năm kinh nghiệm tư vấn tâm lý qua Tarot",
                "Được chứng nhận về đọc bài Oracle",
                "Tham gia nhiều hội thảo quốc tế về Tarot",
              ];

        setProfile({
          name,
          introduction,
          experience,
          packages: tarotPackages,
          imgUrl: accountData.imgUrl,
          likes: accountData.likes,
          ratings: accountData.ratings,
          expertise: accountData.expertise,
        });
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="reader-profile">
      <header className="page-header">
        <h1>READER PROFILE</h1>
      </header>
      <div className="profile-details">
        <img
          src={profile.imgUrl}
          alt={`${profile.name}'s profile`}
          className="profile-image"
        />
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-likes">Lượt yêu thích: {profile.likes}</p>
        <p className="profile-ratings">
          <span className="ratings-text">Lượt đánh giá:</span>
          {Array.from({ length: 5 }, (_, index) =>
            index < profile.ratings ? "★" : "☆"
          ).join("")}
        </p>
        <p className="profile-expertise">
          Chuyên môn: {(profile.expertise || []).join(", ")}
        </p>
      </div>
      <div className="profile-container">
        <div className="profile-main">
          <div className="profile-info">
            <section className="introduction">
              <h2 className="section-title">Giới thiệu</h2>
              <p className="section-content">{profile.introduction}</p>
            </section>
            <section className="experience">
              <h2 className="section-title">Kinh nghiệm</h2>
              <ul className="experience-list">
                {profile.experience.map((item, index) => (
                  <li key={index} className="experience-item">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="packages">
            <h2 className="section-title">Các gói trải bài</h2>
            {profile.packages && profile.packages.length > 0 ? (
              profile.packages.map((pkg) => (
                <div key={pkg.id} className="package"> 
                  <div className="package-content">
                    <img
                      src={pkg.imgUrl}
                      alt={pkg.name}
                      className="package-image"
                    />
                    <div className="package-info">
                      <h3 className="package-title">{pkg.name}</h3>
                      <p className="package-price">{pkg.price} VND</p>
                      <p className="package-description">{pkg.description}</p>
                      <button className="book-button" onClick={() => handleBooking(pkg.id)}>
                        ĐẶT LỊCH NGAY
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có gói trải bài nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderProfile;
