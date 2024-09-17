import React from "react";
import "./index.scss";
import Dropdown from "../dropdown";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation(); 
  const isLoginPage = location.pathname === "/login"; 
  const isDichVuPage = location.pathname === "/dichvu"; 
  const isHomePage = location.pathname === "/"; 
  const isZodiacPage = location.pathname === "/zodiac";

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
            <Link to="/" className={isHomePage ? "active-link" : ""}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/dichvu"
              className={isDichVuPage ? "active-link" : ""}
            >
              Dịch vụ
            </Link>
          </li>
          <li>Tra cứu</li>

          <li>
            <Link
              to="/zodiac"
              className={isZodiacPage ? "active-link" : ""}
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "inherit",
              }}
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
