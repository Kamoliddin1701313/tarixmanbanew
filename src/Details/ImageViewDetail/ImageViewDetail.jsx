// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import style from "./ImageViewDetail.module.scss";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { GrFormNext } from "react-icons/gr";
// import { SiHomeadvisor } from "react-icons/si";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import Loading from "../../Loading/Loading";

// function ImageViewDetail() {
//   const [loading, setLoading] = useState(true);
//   const { id, detailId } = useParams();
//   const [data, setData] = useState([]);
//   const [searchParams] = useSearchParams();
//   const page = Number(searchParams.get("page")) || 1;

//   const navigate = useNavigate();

//   const getData = async () => {
//     try {
//       const respons = await axios.get(`category-resource/${id}?page=${page}`);
//       // const respons = await axios.get(`resource_api-detail/${id}/${detailId}`);
//       if (respons.status) {
//         setData(respons?.data?.resources?.results);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [id]);

//   const ImageDataById = data.find(
//     (value) => Number(value.id) === Number(detailId)
//   );

//   console.log(ImageDataById, "ImageDataById   22222222222");
//   console.log(id, detailId, "XXXXXXXXXXXX");
//   console.log(data, "xa data");

//   //   useEffect(() => {
//   //     console.log("Category ID:", id);
//   //     console.log("Detail ID:", detailId);
//   //   }, [id, detailId]);
//   //   console.log(detailId, "detailId");

//   return (
//     <div>
//       <div className={style.wrapper}>
//         <div className={style.prevButtons}>
//           <button onClick={() => navigate("/")}>
//             <SiHomeadvisor />
//             <GrFormNext />
//             <span>{ImageDataById?.category_name}</span>
//           </button>

//           <button>
//             <GrFormNext />
//             <span>{ImageDataById?.title}</span>
//           </button>
//         </div>
//       </div>

//       <h1>
//         {id} va {detailId}
//       </h1>

//       {loading ? (
//         <Loading />
//       ) : (
//         <div className={style.container}>
//           <div className={style.containerBtn}>
//             <button onClick={() => navigate(-1)}>
//               <FaArrowLeftLong />
//             </button>
//             <h1>{ImageDataById?.title}</h1>
//           </div>
//           <img src={ImageDataById?.image} alt={ImageDataById?.title} />
//           {console.log(ImageDataById?.image, "NIMA BO'LDI KAMOLIDDIN")}
//           {ImageDataById?.contents?.map((value, index) => (
//             <p
//               key={index}
//               dangerouslySetInnerHTML={{ __html: value?.description }}
//             ></p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageViewDetail;

// ssssssssssssssss
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
  const [error, setError] = useState(null);
  const { id, detailId } = useParams();
  const [data, setData] = useState(null); // Faqat bitta element saqlanadi
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  // Filter parametrlarini olish
  const filters = searchParams.getAll("filters");
  const periodFilters = searchParams.getAll("period_filter");
  const searchQuery = searchParams.get("search");
  const page = searchParams.get("page") || 1;

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Avvalo, alohida detail endpointidan urinib ko'ramiz (agar mavjud bo'lsa)
      try {
        const detailResponse = await axios.get(
          `resource_api-detail/${id}/${detailId}` //yoki bu API yoki bunisi bo'ladi
          // `category-resource/${id}/${detailId}`
        );
        if (detailResponse.data) {
          setData(detailResponse.data);
          return;
        }
        console.log(detailResponse, "1111111111");
      } catch (detailError) {
        console.log(
          detailError,
          "Alohida detail endpointi mavjud emas, filter bilan qidirish..."
        );
      }

      // 2. Agar alohida endpoint bo'lmasa, filterlangan ro'yxatdan qidirish
      const params = new URLSearchParams();
      params.append("page", page);
      filters.forEach((f) => params.append("filters", f));
      periodFilters.forEach((p) => params.append("period_filter", p));
      if (searchQuery) params.append("search", searchQuery);

      const response = await axios.get(
        `category-resource/${id}?${params.toString()}`
      );

      if (response.status === 200) {
        const foundItem = response.data?.resources?.results?.find(
          (item) => Number(item.id) === Number(detailId)
        );

        if (foundItem) {
          setData(foundItem);
        } else {
          setError(
            "Ma'lumot topilmadi. Filter parametrlari o'zgartirilgan bo'lishi mumkin."
          );
        }
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setError("Ma'lumot yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id, detailId, searchParams]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className={style.errorContainer}>
        <h2>{error}</h2>
        <button onClick={() => navigate(-1)}>Orqaga qaytish</button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={style.notFound}>
        <h2>Ma'lumot topilmadi</h2>
        <button onClick={() => navigate(-1)}>Orqaga</button>
      </div>
    );
  }

  console.log(data, "Salom Kamoliddin");

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.prevButtons}>
          <button onClick={() => navigate("/")}>
            <SiHomeadvisor />
            <GrFormNext />
            <span>{data?.category_name}</span>
          </button>

          <button>
            <GrFormNext />
            <span>{data?.title}</span>
          </button>
        </div>
      </div>

      <div className={style.container}>
        <div className={style.containerBtn}>
          <button onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
          </button>
          <h1>{data?.title}</h1>
        </div>
        <img src={data?.image} alt={data?.title} />
        {data?.contents?.map((value, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: value?.description }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageViewDetail;
