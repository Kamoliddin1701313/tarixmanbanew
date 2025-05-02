import axios from "axios";
import { useState, useEffect } from "react";

const API_KEY = "cf5539e74f184a346c252554125256a7";

const HttpWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const cities = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Khiva",
  "Urgench",
  "Andijan",
  "Fergana",
  "Namangan",
  "Nukus",
  "Navoi",
  "Gulistan",
  "Jizzakh",
  "Termez",
  "Qarshi",
];

const getWeatherByCity = (city) =>
  HttpWeather.get("/weather", {
    params: {
      q: city,
      units: "metric",
      lang: "uz",
      appid: API_KEY,
    },
  });

const useList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        const requests = cities.map((city) => getWeatherByCity(city));
        const responses = await Promise.all(requests);

        const weatherData = responses.map((response) => ({
          city: response.data.name,
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
        }));

        setData(weatherData);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeather();
  }, []);

  return { data };
};

export default useList;
