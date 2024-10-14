import "./tarotReader.scss";
import { Link } from "react-router-dom";

function TarotReader() {
  return (
    <div className="tarot-reader">
      <h1 className="title">TAROT READER</h1>
      <div className="images-container">
        <div className="image-card">
          <Link to={"/dichvu"}>
            <img src="https://i.imgur.com/MI2ta0S.png" alt="Tarot Image 1" />
          </Link>
          <div className="label candy">CANDY</div>
        </div>
        <div className="image-card">
          <Link to={"/dichvu"}>
            <img src="https://i.imgur.com/fGigSto.png" alt="Tarot Image 2" />
          </Link>
          <div className="label nonglin">NONGLIN</div>
        </div>
      </div>
    </div>
  );
}

export default TarotReader;
