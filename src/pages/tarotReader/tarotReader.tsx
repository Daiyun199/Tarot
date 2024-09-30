import "./tarotReader.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TarotReader() {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate("/calendar");
  };

  return (
    <div className="tarot-reader">
      <h1 className="title">TAROT READER</h1>
      <div className="images-container">
        <div className="image-card">
          <Link to={"/dichvu"}>
            <img src="https://i.imgur.com/MI2ta0S.png" alt="Tarot Image 1" />
          </Link>
          <div className="label candy">CANDY</div>
          <button className="schedule-button" onClick={handleScheduleClick}>
            Lên lịch ngay
          </button>
        </div>
        <div className="image-card">
          <Link to={"/dichvu"}>
            <img src="https://i.imgur.com/fGigSto.png" alt="Tarot Image 2" />
          </Link>
          <div className="label nonglin">NONGLIN</div>
          <button className="schedule-button" onClick={handleScheduleClick}>
            Lên lịch ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarotReader;
