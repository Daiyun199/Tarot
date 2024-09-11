import React, { useState } from "react";
import "./index.scss";
import {
  UserOutlined,
  SettingOutlined,
  HeartOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <i className="icon menu-icon"></i> {/* Ba dấu gạch ngang */}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#home" className="dropdown-item">
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
          <a href="#settings" className="dropdown-item">
            <LoginOutlined />
            <i className="icon setting-icon"></i> Đăng xuất
          </a>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
