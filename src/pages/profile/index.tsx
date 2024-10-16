import "./index.scss";

import ImageUpload from "../../components/upload_image";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import { UserData } from "../../model/UserData";
function Profile() {
  const [userData, setUserData] = useState<Partial<UserData>>({
    name: "",
    id: "",
    dob: "",
    nickname: "",
    gender: "",
    phone: "",
    email: "",
    imgUrl: "",
  });

  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const fetchData = async () => {
    try {
      const response = await api.get<UserData>("Auth/who-am-i");
      const data = response.data;
      setUserData({
        name: data.name || "",
        id: data.id || "",
        dob: data.dob || "",
        nickname: data.nickname || "",
        gender: data.gender || "",
        phone: data.phone || "",
        email: data.email || "",
        imgUrl: data.imgUrl || "",
      });
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(
        error.response?.status === 404
          ? "Dữ liệu không tìm thấy."
          : "Không thể tải dữ liệu. Vui lòng thử lại sau."
      );
      setLoading(false);
    }
  };

  // Sử dụng useEffect để fetch dữ liệu khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="profile__loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="profile__error">{error}</div>;
  }
  return (
    <div className="profile">
      <div className="profile__title">Thông tin cá nhân</div>
      <div className="profile__upload">
        <ImageUpload imgUrl={userData.imgUrl} />
      </div>
      <div className="profile__info">
        <div className="profile__info__box">
          <div className="profile__info__box__title">Giới thiệu về bạn</div>
          <div className="profile__info__box__container">
            <p>{userData.name || "Tên của bạn"}</p>
            <p>{userData.id || "ID của bạn"}</p>
            <p>{userData.nickname || "Nickname"}</p>
            <p>
              {userData.dob
                ? new Date(userData.dob).toLocaleDateString()
                : "Ngày Sinh"}
            </p>
            <p>{userData.gender || "Giới Tính"}</p>
            <p>{userData.phone || "Số điện thoại"}</p>
            <p>{userData.email || "Email"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
