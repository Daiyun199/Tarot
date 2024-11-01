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
  DashboardOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import api from "../../config/axios";
import { getRoleName, Roles } from "../../model/Role";
import decodeUserRole from "../decodeToken/decodeToken"; // Import hàm decodeUserRole

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userData = localStorage.getItem("userData");
  const user2 = userData ? JSON.parse(userData) : null;
  const token = user2?.accessToken;

  // Giải mã vai trò người dùng từ token khi token thay đổi
  useEffect(() => {
    if (token) {
      const decodedRole = decodeUserRole(token);
      setRole(decodedRole);
    }
  }, [token]);

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
  const handleDashboardClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const handleCartClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await api.get("Order/order-detail/get-cart");
      console.log("Cart data:", response.data);
      navigate("/checkout");
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <i className="icon menu-icon"></i>
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
          {role === getRoleName(Roles.Admin.toString()) ? (
            <a
              href="#dashboard"
              className="dropdown-item"
              onClick={handleDashboardClick}
            >
              <DashboardOutlined />
              <span className="item-text">Dashboard</span>
            </a>
          ) : (
            <a href="#cart" className="dropdown-item" onClick={handleCartClick}>
              <ShoppingCartOutlined />
              <span className="item-text">Giỏ hàng</span>
            </a>
          )}
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
            <a href="/reader-management" className="dropdown-item">
              <CalendarOutlined />
              <span className="item-text">Quản lý lịch</span>
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
