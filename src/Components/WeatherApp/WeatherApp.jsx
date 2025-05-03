import React, { useEffect, useState } from "react";
import axios from "axios";
import blut from "./blut.png";
import blutliquyosh from "./blutli-quyosh.png";
import yomgir from "./yomgir.png";
import style from "./weatherApp.module.scss";
import Slider from "react-slick";
import useList from "./API";

const getImageByWeather = (description) => {
  if (description.includes("yomg'ir") || description.includes("rain")) {
    return yomgir;
  } else if (description.includes("bulut") || description.includes("cloud")) {
    return blut;
  } else if (description.includes("quyosh") || description.includes("clear")) {
    return blutliquyosh;
  } else {
    return blut; // default image
  }
};

function WeatherApp() {
  const { data } = useList();
  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    initialSlide: 0,
    pauseOnHover: true,
  };

  return (
    <div className={style["weather-container"]}>
      <Slider {...settings}>
        {data?.map((value, index) => (
          <div key={index} className={style["weather-card"]}>
            <img
              src={getImageByWeather(value.description)}
              alt={value.description}
              className={style["weather-icon"]}
            />
            <p>{value.city}</p>
            <p>
              {Math.ceil(value?.temp)}°...{" "}
              {Math.ceil(Math.ceil(value?.temp) + Math.random() * 10)}°
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default WeatherApp;
