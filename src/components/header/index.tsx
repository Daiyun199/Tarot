import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import Dropdown from "../dropdown";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isDichVuPage = location.pathname === "/dichvu";
  const isHomePage = location.pathname === "/";
  const isZodiacPage = location.pathname === "/zodiacs";
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const lastScrollPosition = useRef<number>(0);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      console.error("Header element not found");
      return;
    }

    // Hiển thị header ngay khi tải trang
    header.classList.remove("header--hidden");

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      console.log(`Current scroll position: ${currentScrollPosition}`);
      console.log(`Last scroll position: ${lastScrollPosition.current}`);

      if (currentScrollPosition === 0) {
        header.classList.remove("header--hidden");
        setIsHeaderHidden(false);
      } else if (
        currentScrollPosition > lastScrollPosition.current &&
        !isHeaderHidden
      ) {
        header.classList.add("header--hidden");
        setIsHeaderHidden(true);
        console.log("Header hidden");
      } else if (
        currentScrollPosition < lastScrollPosition.current &&
        isHeaderHidden
      ) {
        header.classList.remove("header--hidden");
        setIsHeaderHidden(false);
        console.log("Header shown");
      }

      lastScrollPosition.current = currentScrollPosition;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 50) {
        header.classList.remove("header--hidden");
        setIsHeaderHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Xóa isHeaderHidden ra khỏi mảng phụ thuộc

  return (
    <div
      className={`header ${isHeaderHidden ? "header--hidden" : ""}`}
      ref={headerRef}
    >
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
