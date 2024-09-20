import React from "react";
import "./index.scss";
import Dropdown from "../dropdown";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isDichVuPage = location.pathname === "/dichvu";
  const isHomePage = location.pathname === "/";
  const isZodiacPage = location.pathname === "/zodiacs";
  let lastScrollPosition = 0;
  const header = document.querySelector(".header");
  let isHeaderHidden = false;

  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition && !isHeaderHidden) {
      // Cuộn xuống => Ẩn header
      header.classList.add("header--hidden");
      isHeaderHidden = true;
    } else if (currentScrollPosition < lastScrollPosition && isHeaderHidden) {
      // Cuộn lên => Hiện lại header
      header.classList.remove("header--hidden");
      isHeaderHidden = false;
    }

    lastScrollPosition = currentScrollPosition;
  });

  window.addEventListener("mousemove", (event) => {
    // Kiểm tra nếu con trỏ chuột ở phần trên cùng (ví dụ: trong khoảng 50px đầu)
    if (event.clientY < 50) {
      header.classList.remove("header--hidden");
    } else if (!isHeaderHidden) {
      header.classList.add("header--hidden");
    }
  });

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
            <Link to="/dichvu" className={isDichVuPage ? "active-link" : ""}>
              Dịch vụ
            </Link>
          </li>
          <li>Tra cứu</li>

          <li>
            <Link
              to="/zodiacs"
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
