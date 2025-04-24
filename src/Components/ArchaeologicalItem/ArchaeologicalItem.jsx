import React, { useContext, useEffect, useState } from "react";
import style from "./archaeologicalItem.module.scss";
import Slider from "react-slick";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
// import { ValueContext } from "../../App";

function ArchaeologicalItem() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const dd = useContext(ValueContext);

  const getData = async () => {
    const respons = await axios.get("category_api-list/");
    setData(respons.data.results);
  };

  useEffect(() => {
    getData();
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          color: "blue",
          fontSize: "20px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          boxShadow: "0 0 12px blue",
          zIndex: 1,
          right: "-12px",
          top: "48%",
          position: "absolute",
        }}
        onClick={onClick}
      >
        <TbPlayerTrackNextFilled />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          color: "blue",
          fontSize: "20px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          zIndex: 1,
          boxShadow: "0 0 12px blue",
          left: "-12px",
          top: "48%",
          position: "absolute",
        }}
        onClick={onClick}
      >
        <TbPlayerTrackPrevFilled />
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  console.log(data, "mmmmmmmmmmmm");

  return (
    <div className={style.container}>
      <div className={style["carusel-container"]}>
        {data?.map(
          (value, idx) =>
            value?.resources?.results?.length > 0 && (
              <div key={idx} className={style.card__container}>
                <div className={style.btns}>
                  <h1>{value.title}</h1>
                  <button
                    onClick={() => navigate(`homeImageDetail/${value.id}`)}
                  >
                    <span>Barchasi</span>
                    <TbArrowBigRightLinesFilled />
                  </button>
                </div>

                <Slider {...settings}>
                  {value?.resources?.results?.map((v, i) => (
                    <div key={i} className={style.card__article}>
                      <img src={v.image} alt={v?.title} />
                      <div className={style.card__data}>
                        <p>{v?.title}</p>
                        <button
                          onClick={() =>
                            navigate(`/archaeological/${v.id}`, {
                              state: value,
                            })
                          }
                        >
                          Batafsil
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ArchaeologicalItem;
