import React from "react";
import ZodiacList from "../../components/zodiac_list";
import "./index.scss";
function ZodiacHome() {
  return (
    <div className="zodiac-container">
      <div className="zodiac-container__top">
        <h1>TAROT X ZODIAC</h1>
      </div>
      <div className="zodiac-container__bottom">
        <p>
          Thông điệp sẽ giúp các cung hoàng đạo có cài nhìn tổng quan hơn nhennn
        </p>
      </div>
      <ZodiacList />
    </div>
  );
}

export default ZodiacHome;
