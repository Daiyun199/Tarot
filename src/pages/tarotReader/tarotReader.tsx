import React from 'react';
import './tarotReader.scss';

function TarotReader() {
  return (
    <div className="tarot-reader">
      <h1 className="title">TAROT READER</h1>
      <div className="images-container">
        <div className="image-card">
          <img src="path_to_image_1.jpg" alt="Tarot Image 1" />
          <button className="schedule-button">Lên lịch ngay</button>
        </div>
        <div className="image-card">
          <img src="path_to_image_2.jpg" alt="Tarot Image 2" />
          <button className="schedule-button">Lên lịch ngay</button>
        </div>
      </div>
    </div>
  );
}

export default TarotReader;
