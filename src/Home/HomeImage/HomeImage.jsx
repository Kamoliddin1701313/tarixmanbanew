import React, { useEffect, useState } from "react";
import style from "./homeImage.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function HomeImage() {
  const [data, setData] = useState([]);
  const [animation, setAnimation] = useState(null);

  const getData = async () => {
    try {
      const respons = await axios.get("category-resource/");
      if (respons.status) {
        setData(respons.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const animationBtn = (id) => {
    setAnimation(id);
  };

  return (
    <div className={style.container}>
      <div className={style["images-container"]}>
        {data?.slice(0, 7).map((value, idx) => (
          <div
            key={idx}
            className={`${style.img} ${
              animation === value.id ? style.imgWidth : ""
            }`}
            onClick={() => animationBtn(value.id)}
          >
            <img src={value?.image} alt={value.title} />
            <Link
              to={`homeImageDetail/${value.id}`}
              className={style.detailLink}
              style={{ display: animation === value.id ? "block" : "none" }}
            >
              <span>{value.title}</span>
            </Link>
          </div>
        ))}
      </div>

      <div className={style["images-container1"]}>
        {data?.slice(7, 13).map((value, idx) => (
          <div
            key={idx}
            className={`${style.img} ${
              animation === value.id ? style.imgWidth : ""
            }`}
            onClick={() => animationBtn(value.id)}
          >
            <img src={value?.image} alt={value.title} />
            <Link
              to={`homeImageDetail/${value.id}`}
              className={style.detailLink}
              style={{ display: animation === value.id ? "block" : "none" }}
            >
              <span>{value.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeImage;
