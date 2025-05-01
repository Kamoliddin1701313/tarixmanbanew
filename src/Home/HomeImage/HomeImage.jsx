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
        {data?.map((value, idx) => (
          <div
            key={idx}
            className={`${style.img} ${
              animation === value.id ? style.imgWidth : ""
            }`}
            onClick={() => animationBtn(value.id)}
          >
            <img src={value?.image} alt={value.title} />
            <div className={style.detailLink}>
              <span>
                <Link to={`homeImageDetail/${value.id}`}>{value.title}</Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeImage;
