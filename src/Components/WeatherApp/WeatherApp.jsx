import React, { useEffect, useState } from "react";
import axios from "axios";
import blut from "./blut.png";
import blutliquyosh from "./blutli-quyosh.png";
import yomgir from "./yomgir.png";
import style from "./weatherApp.module.scss";

function WeatherApp() {
  const regions = [
    "Tashkent",
    "Andijan",
    "Namangan",
    "Fergana",
    "Sirdarya",
    "Jizzakh",
    "Samarkand",
    "Bukhara",
    "Navoi",
    "Khorezm",
    "Nukus",
    "Surkhandarya",
    "Kashkadarya",
  ];

  const [weatherData, setWeatherData] = useState([]);
  const apiKey = "f00c38e0279b7bc85480c3fe775d518c";

  useEffect(() => {
    regions.forEach((region) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setWeatherData((prevData) => [...prevData, response.data]);
        })
        .catch((error) => {
          console.error("Error fetching weather data: ", error);
        });
    });
  }, []);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return blut;
      case "Rain":
        return yomgir;
      case "Clouds":
        return blutliquyosh;
      default:
        return yomgir;
    }
  };

  console.log(weatherData, "weatherData");

  return (
    <div className={style["weather-container"]}>
      {weatherData.length > 0 ? (
        weatherData.map((data) => (
          <div key={data.id} className={style["weather-card"]}>
            <h2>{data.name}</h2>
            <p>{data.main.temp}°C</p>
            <p>{data.weather[0].description}</p>
            <img
              src={getWeatherIcon(data.weather[0].main)}
              alt={data.weather[0].description}
            />
          </div>
        ))
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherApp;
