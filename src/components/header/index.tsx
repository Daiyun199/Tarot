import React from "react";
import "./index.scss";
import Dropdown from "../dropdown";
function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left__logo">
          <img src="https://i.imgur.com/tZ66IFQ.png" width={50} alt=""></img>
        </div>
        <div className="header__left__name">
          <img src="https://i.imgur.com/Kx2IQRt.png" width={100} alt=""></img>
        </div>
      </div>
      <div className="header__right">
        <ul className="header__right__navigation">
          <li>Trang chủ</li>
          <li>Dịch vụ</li>
          <li>Tra cứu</li>
          <li>Zodiac</li>
          <li>Tài Khoản</li>
          <li>
            {/* <img src="https://i.imgur.com/OxJk46A.png" alt="icon" width={50} /> */}
            <Dropdown />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
