import React from "react";
import "./index.scss";
import Dropdown from "../dropdown";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation(); // Get the current location
  const isLoginPage = location.pathname === "/login"; // Check if the current path is '/login'

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left__logo">
          <img src="https://i.imgur.com/tZ66IFQ.png" width={80} alt=""></img>
        </div>
        <div className="header__left__name">
          <img src="https://i.imgur.com/Kx2IQRt.png" width={150} alt=""></img>
        </div>
      </div>
      <div className="header__right">
        <ul className="header__right__navigation">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/dichvu">Dịch vụ</Link>
          </li>
          <li>Tra cứu</li>

          <li>
            <Link
              to="/zodiacs"
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "inherit",
              }}
              className="zodiac-link"
            >
              Zodiac
            </Link>
          </li>

          <li>Tài Khoản</li>
          {!isLoginPage && (
            <li>
              <Dropdown />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
