import { useEffect, useState } from "react";
import style from "./news.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

function News() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const respons = await axios.get("news/");
      if (respons.status) {
        setData(respons.data.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "API da ma'luotlar kelmayabdi");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className={style.container}>
        {loading ? (
          <Loading />
        ) : data.length > 0 ? (
          <div className={style.cards}>
            {data?.map((value, idx) => (
              <div key={idx} className={style.card}>
                <h2>{value.title}</h2>
                <div className={style.box}>
                  <h2>{value.title}</h2>
                  <button onClick={() => navigate(`/news/${value.id}`)}>
                    Batafsil
                  </button>
                </div>
                <img
                  loading="lazy"
                  decoding="async"
                  src={value.file}
                  alt={value.name}
                />
              </div>
            ))}
          </div>
        ) : (
          <h1>Ma'lumotlar yo'q ekan</h1>
        )}
      </div>
    </div>
  );
}

export default News;
