import { useState } from "react";
import "./index.scss";
import {
  UserOutlined,
  SettingOutlined,
  HeartOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const user = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();

  const handleAccountClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login"); // Điều hướng sau khi đăng xuất
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <i className="icon menu-icon"></i> {/* Ba dấu gạch ngang */}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a
            href="#account"
            className="dropdown-item"
            onClick={handleAccountClick}
          >
            <UserOutlined />
            <i className="icon home-icon"></i> Tài Khoản
          </a>
          <a href="#profile" className="dropdown-item">
            <ShoppingCartOutlined />
            <i className="icon user-icon"></i> Giỏ hàng
          </a>
          <a href="#search" className="dropdown-item">
            <HeartOutlined />
            <i className="icon search-icon"></i> Yêu thích
          </a>
          <a href="#notifications" className="dropdown-item">
            <SettingOutlined />
            <i className="icon bell-icon"></i> Cài đặt
          </a>
          <a href="#settings" className="dropdown-item" onClick={handleLogout}>
            <LoginOutlined />
            <i className="icon setting-icon"></i> Đăng xuất
          </a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
