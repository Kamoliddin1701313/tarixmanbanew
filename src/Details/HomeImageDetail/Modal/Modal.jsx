import React from "react";
import style from "./modal.module.scss";
import { RiCloseLargeLine } from "react-icons/ri";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Marquee from "react-fast-marquee";

function Modal(props) {
  const { value, views, setViews, valueId } = props.data;
  const { type } = views;

  console.log(value.locations, "Salom Modal Component");

  const renderContent = () => {
    const latitude = value.locations?.[0]?.latitude;
    const longitude = value.locations?.[0]?.longitude?.replace(".", "");
    switch (type) {
      case "audios":
        return (
          <div className={style.audios}>
            <Marquee>
              <h3>{`${value?.audios?.[0]?.title}`}</h3>
            </Marquee>

            <audio controls style={{ width: "100%" }}>
              <source src={`${value?.audios?.[0]?.audio}`} type="audio/mp4" />
            </audio>
          </div>
        );

      case "galleries":
        return (
          <div className={style.galleries}>
            <img src={`${value?.galleries?.[0]?.image}`} alt="Gallery" />
          </div>
        );

      case "contents":
        return (
          <div className={style.contents}>
            <div className={style.text}>
              <p
                dangerouslySetInnerHTML={{
                  __html: value?.contents?.[0]?.description,
                }}
              ></p>
            </div>
          </div>
        );

      case "locations":
        return (
          // <div>
          //   <iframe
          //     src={`${value.locations?.[0]?.location}`}
          //     width="100%"
          //     height="400"
          //     style={{ border: 0 }}
          //     allowFullScreen=""
          //     loading="lazy"
          //     referrerPolicy="no-referrer-when-downgrade"
          //     title="Location Map"
          //   ></iframe>
          // </div>

          <YMaps>
            <Map
              className={style.map}
              defaultState={{
                center: [latitude, longitude],
                zoom: 12,
              }}
            >
              <Placemark geometry={[latitude, longitude]} />
            </Map>
          </YMaps>
        );

      case "3d":
        return (
          <div>
            <h3>3D:</h3>
            <iframe
              src={`${value.locations?.[0]?.location}`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        );

      case "videos":
        return (
          <video controls style={{ width: "100%", maxHeight: "400px" }}>
            <source src={value.videos?.[0]?.video} type="video/mp4" />
          </video>
        );

      default:
        return <div>Ma'lumot topilmadi</div>;
    }
  };

  return (
    <div className={style.openModal}>
      <RiCloseLargeLine onClick={() => setViews(false)} />
      <div className={style.views}>{views?.open && renderContent()}</div>
    </div>
  );
}

export default Modal;
