import React from "react";
import "./tarotReader.scss";

function TarotReader() {
  return (
    <div className="tarot-reader">
  <h1 className="title">TAROT READER</h1>
  <div className="images-container">
    <div className="image-card">
      <img src="https://i.imgur.com/MI2ta0S.png" alt="Tarot Image 1" />
      <div className="label candy">CANDY</div> 
      <button className="schedule-button">Lên lịch ngay</button>
    </div>
    <div className="image-card">
      <img src="https://i.imgur.com/fGigSto.png" alt="Tarot Image 2" />
      <div className="label nonglin">NONGLIN</div> 
      <button className="schedule-button">Lên lịch ngay</button>
    </div>
  </div>
</div>

  );
}

export default TarotReader;
