import React from "react";
import "./index.scss";
function Header() {
  return (
    <div className="header">
      <ul className="header__navigation">
        <li>Trang chủ</li>
        <li>Dịch vụ</li>
        <li>Tra cứu</li>
        <li>Tarot</li>
        <li>Liên hệ</li>
        <li>
          <img src="https://i.imgur.com/OxJk46A.png" alt="icon" width={50} />
        </li>
      </ul>
    </div>
  );
}

export default Header;
