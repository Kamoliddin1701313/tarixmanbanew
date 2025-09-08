import { useEffect, useState } from "react";
import style from "./about.module.scss";
import axios from "axios";
import Loading from "../../Loading/Loading";
import logo from "./logo.png";

function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const respons = await axios.get("/employee/");
      if (respons.status) {
        setData(respons.data.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : data.length ? (
        <div>
          {/* <div className={style.lineX}></div> */}

          <h1 className={style.users}>Ishtirokchilar</h1>

          <div className={style.cards}>
            {data
              ?.sort((a, b) => a.order - b.order)
              .map((value, idx) => (
                <div key={idx} className={style.card}>
                  <img
                    loading="lazy"
                    decoding="async"
                    src={"https://backend.tarixmanba.uz" + value.image}
                    alt={value.full_name}
                  />
                  <div className={style.description}>
                    <h3>{value.full_name}</h3>
                    <h4>{value.degree}</h4>
                  </div>
                </div>
              ))}
          </div>

          <div className={style.location_about}>
            <div className={style.location}>
              <img loading="lazy" decoding="async" src={logo} alt="logo" />
              <h1>Biz haqimizda</h1>
              <h1>
                O‘zbekiston Respublikasi Fanlar akademiyasi Tarix instituti
              </h1>
              <p>
                100060, Toshkent sh., Mirobod tumani Shahrisabz tor ko‘chasi,
                5-uy
              </p>
              <p>Telefon: (+998 71) 233-54-70</p>
              <p>Faks: (+998 71) 233-39-91</p>

              <p>
                Rasmiy sayt: <a href="https://fati.uz">fati.uz</a>
              </p>
            </div>

            <div className={style.iframe}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5992.963462466031!2d69.234307!3d41.320137!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzEyLjUiTiA2OcKwMTQnMDMuNSJF!5e0!3m2!1sen!2sus!4v1743963492601!5m2!1sen!2sus"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        "salomat"
      )}

      {/* <div className={style.location}>
        <h1>Biz haqimizda</h1>
        <h1>O‘zbekiston Respublikasi Fanlar akademiyasi Tarix instituti</h1>
        <p>
          100060, Toshkent sh., Mirobod tumani Shahrisabz tor ko‘chasi, 5-uy
        </p>
        <p>Telefon: (+998 71) 233-54-70</p>
        <p>Faks: (+998 71) 233-39-91</p>
        <p>
          Rasmiy sayt: <a href="https://fati.uz">fati.uz</a>
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d5992.963462466031!2d69.234307!3d41.320137!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE5JzEyLjUiTiA2OcKwMTQnMDMuNSJF!5e0!3m2!1sen!2sus!4v1743963492601!5m2!1sen!2sus"
          width="100%"
          height="500"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            border: "none",
            margin: "30px 0 0",
            borderRadius: "0 0 20px 20px",
          }}
        ></iframe>
      </div>

      <div className={style.cards}>
        {data
          ?.sort((a, b) => a.order - b.order)
          .map((value, idx) => (
            <div key={idx} className={style.card}>
              <img
                src={"https://backend.tarixmanba.uz" + value.image}
                alt={value.full_name}
              />
              <div className={style.description}>
                <h2>{value.full_name}</h2>
                <h3>{value.degree}</h3>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  );
}

export default About;
