import React, { useEffect, useState } from "react";
import style from "./homeImage.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function HomeImage() {
  const [data, setData] = useState([]);
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

  return (
    <div className={style.container}>
      <div className={style["images-container"]}>
        {data?.map((value, idx) => (
          <div key={idx} className={style.img}>
            <img src={value?.image} alt={value.title} />
            <Link to={`homeImageDetail/${value.id}`}>
              <span>{value.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeImage;
