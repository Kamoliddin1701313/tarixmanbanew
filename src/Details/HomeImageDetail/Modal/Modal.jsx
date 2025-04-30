import React from "react";
import style from "./modal.module.scss";
import { RiCloseLargeLine } from "react-icons/ri";
import Marquee from "react-fast-marquee";

function Modal(props) {
  const { value, views, setViews, valueId } = props.data;
  const { type } = views;

  console.log(value, "Salom Modal Component");

  const renderContent = () => {
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
        return <img src={`${value?.galleries?.[0]?.image}`} alt="Gallery" />;

      case "contents":
        return (
          <div className={style.contents}>
            <p
              dangerouslySetInnerHTML={{
                __html: value?.contents?.[0]?.description,
              }}
            ></p>
          </div>
        );

      case "locations":
        return (
          <div>
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
