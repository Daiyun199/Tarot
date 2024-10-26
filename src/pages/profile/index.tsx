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

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleSave = async () => {
    try {
      const { name, dob, gender, phone, id } = userData;

      await api.put(
        `Account/update/${id}`,
        { name, dob, gender, phone },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  placeholder="Tên của bạn"
                />
                <input
                  type="text"
                  value={userData.nickname}
                  onChange={(e) =>
                    setUserData({ ...userData, nickname: e.target.value })
                  }
                  placeholder="Nickname"
                />
                <input
                  type="date"
                  value={
                    userData.dob
                      ? new Date(userData.dob).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setUserData({ ...userData, dob: e.target.value })
                  }
                  placeholder="Ngày Sinh"
                />
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                >
                  <option value="">Chọn Giới Tính</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  placeholder="Số điện thoại"
                />
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  placeholder="Email"
                />
                <div className="button-group">
                  <button className="save-button" onClick={handleSave}>
                    Lưu
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{userData.name || "Tên của bạn"}</p>
                <p>{userData.nickname || "Nickname"}</p>
                <p>
                  {userData.dob
                    ? new Date(userData.dob).toLocaleDateString()
                    : "Ngày Sinh"}
                </p>
                <p>{userData.gender || "Giới Tính"}</p>
                <p>{userData.phone || "Số điện thoại"}</p>
                <p>{userData.email || "Email"}</p>
                <div className="button-group">
                  <button
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Sửa
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
