// src/components/Dropdown/Dropdown.tsx

import { useEffect, useState } from "react";
import "./index.scss";
import {
  UserOutlined,
  SettingOutlined,
  HeartOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../model/Decoded";
import { getRoleName, Roles } from "../../model/Role";
// Đảm bảo đường dẫn đúng

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const userData = localStorage.getItem("userData");
  const user2 = userData ? JSON.parse(userData) : null;

  const token = user2?.accessToken;
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const response =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      setRole(response); // Cập nhật role trong useEffect
    } else {
      console.log("No token found");
    }
  }, [token]); // Theo dõi sự thay đổi của token
  const navigate = useNavigate();

  const handleAccountClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (userData) {
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
            <span className="item-text">Tài Khoản</span>
          </a>
          <a href="#profile" className="dropdown-item">
            <ShoppingCartOutlined />
            <span className="item-text">Giỏ hàng</span>
          </a>
          <a href="#search" className="dropdown-item">
            <HeartOutlined />
            <span className="item-text">Yêu thích</span>
          </a>
          {role === getRoleName(Roles.Admin.toString()) ||
          role === getRoleName(Roles.Staff.toString()) ? (
            <a href="#settings" className="dropdown-item">
              <SettingOutlined />
              <span className="item-text">Cài đặt</span>
            </a>
          ) : role === getRoleName(Roles.Reader.toString()) ? (
            <a href="/reader-schedule" className="dropdown-item">
              <CalendarOutlined />
              <span className="item-text">Lịch xem</span>
            </a>
          ) : null}
          {userData && (
            <a href="#logout" className="dropdown-item" onClick={handleLogout}>
              <LoginOutlined />
              <span className="item-text">Đăng xuất</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
