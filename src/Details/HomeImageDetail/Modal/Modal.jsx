import React from "react";
import style from "./modal.module.scss";
import { RiCloseLargeLine } from "react-icons/ri";

function Modal(props) {
  const { value, views, setViews, valueId } = props.data;
  const { type } = views;

  console.log(value?.galleries?.[0]?.image, "Salom");

  const renderContent = () => {
    switch (type) {
      case "audio":
        return (
          <audio controls style={{ width: "20%" }}>
            <source src={`${value?.audios?.[0]?.audio}`} type="audio/mp4" />
          </audio>
        );

      case "galleries":
        return (
          <img
            src={`${value?.galleries?.[0]?.image}`}
            alt="Gallery"
            style={{
              maxWidth: "80%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        );

      case "contents":
        return (
          <div>
            <p>{value.contents?.[0]?.text}</p>
          </div>
        );

      case "locations":
        return (
          <div>
            <h3>Lokatsiya:</h3>
            <iframe
              src={`https://backend.tarixmanba.uz/${value.locations?.[0]?.location}`}
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
            Sizning brauzeringiz videoni o'qiy olmaydi.
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
