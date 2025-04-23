import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./ImageViewDetail.module.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GrFormNext } from "react-icons/gr";
import { SiHomeadvisor } from "react-icons/si";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "../../Loading/Loading";

function ImageViewDetail() {
  const [loading, setLoading] = useState(true);
  const { id, detailId } = useParams();
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const respons = await axios.get(`category-resource/${id}?page=${page}`);
      // const respons = await axios.get(`resource_api-detail/${id}/${detailId}`);
      if (respons.status) {
        setData(respons?.data?.resources?.results);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const ImageDataById = data.find(
    (value) => Number(value.id) === Number(detailId)
  );

  console.log(data, "data   3333333333");
  console.log(ImageDataById, "ImageDataById   22222222222");
  console.log(detailId, id, "XXXXXXXXXXXX");

  //   useEffect(() => {
  //     console.log("Category ID:", id);
  //     console.log("Detail ID:", detailId);
  //   }, [id, detailId]);
  //   console.log(detailId, "detailId");

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.prevButtons}>
          <button onClick={() => navigate("/")}>
            <SiHomeadvisor />
            <GrFormNext />
            <span>{ImageDataById?.category_name}</span>
          </button>

          <button>
            <GrFormNext />
            <span>{ImageDataById?.title}</span>
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className={style.container}>
          <div className={style.containerBtn}>
            <button onClick={() => navigate(-1)}>
              <FaArrowLeftLong />
            </button>
            <h1>{ImageDataById?.title}</h1>
          </div>
          <img src={ImageDataById?.image} alt={ImageDataById?.title} />
          {console.log(ImageDataById?.image, "NIMA BO'LDI KAMOLIDDIN")}
          {ImageDataById?.contents?.map((value, index) => (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: value?.description }}
            ></p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageViewDetail;
