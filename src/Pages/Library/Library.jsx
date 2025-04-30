import React, { useEffect, useState } from "react";
import Loading from "../../Loading/Loading";
import style from "./library.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SiHomeadvisor } from "react-icons/si";
import { GrFormNext } from "react-icons/gr";
import library from "./library.png";

function Library() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const respons = await axios.get("library-categories/");
      if (respons.status) {
        setData(respons.data.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "API xa xatolik bor");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className={style.container}>
      <div className={style.prevBtn}>
        <div className={style.button}>
          <button onClick={() => navigate("/")}>
            <SiHomeadvisor />
            <span>Uy</span>
            <GrFormNext />
          </button>
          <span>Kutubxona</span>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <div className={style.cards}>
          {data?.map((value, idx) => (
            <div key={idx} className={style.card}>
              <img
                src={value.image ? value.image : library}
                alt={value.title}
              />
              <div className={style.box}>
                <h2>{value.title}</h2>
                <button onClick={() => navigate(`/library/${value.id}`)}>
                  Batafsil
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>Ma'lumotlar yo'q ekan</h1>
      )}
    </div>
  );
}

export default Library;
