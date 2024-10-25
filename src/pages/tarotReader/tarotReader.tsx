import { useEffect, useState } from "react";
import "./tarotReader.scss";
import { Link } from "react-router-dom";
import { Account } from "../../model/Account";
import api from "../../config/axios";

function TarotReader() {
  const [readers, setReaders] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await api.get("Account/Reader");
        setReaders(response.data);
      } catch (err) {
        setError("Failed to fetch readers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReaders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tarot-reader">
      <h1 className="title">TAROT READER</h1>
      <div className="images-container">
        {readers.map((reader) => (
          <div className="image-card" key={reader.id}>
            <Link to={`/dichvu/${reader.id}`}>
              <img src={reader.imgUrl} alt={`Tarot Image of ${reader.name}`} />
            </Link>
            <div className={`label ${reader.name.toLowerCase()}`}>
              {reader.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TarotReader;
