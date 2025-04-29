import React, { useContext, useEffect, useState } from "react";
import style from "./search.module.scss";
import axios from "axios";
import { ValueContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsFillChatTextFill, BsMic } from "react-icons/bs";
import { BiImages } from "react-icons/bi";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { LuRotate3D } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import frut from "./frut.jpg";
import ReactPaginate from "react-paginate";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loading from "../../Loading/Loading";

function Search() {
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useContext(ValueContext);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentPage = Number(searchParams.get("page")) || 1;

  const getData = async (Page = 1) => {
    const respons = await axios.get(`search/?page=${Page}&q=${searchValue}`);
    if (respons.statusText) {
      setData(respons?.data?.results);
      setLoading(false);
    }

    setPageCount(Math.ceil(respons?.data?.count / 20));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
  };

  useEffect(() => {
    getData(currentPage);
  }, [searchValue, currentPage]);

  // const navigate = useNavigate();
  // const { searchValue, setSearchValue } = useContext(ValueContext);
  // const [data, setData] = useState([]);
  // const [pageCount, setPageCount] = useState(0);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [loading, setLoading] = useState(true);
  // const currentPage = Number(searchParams.get("page")) || 1;

  // const getData = async (Page = 1) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`search/?page=${Page}&q=${searchValue}`);
  //     if (response.statusText) {
  //       setData(response?.data?.results);
  //     }
  //     setPageCount(Math.ceil(response?.data?.count / 20));
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handlePageClick = (event) => {
  //   const selectedPage = event.selected + 1;
  //   setSearchParams({ page: selectedPage });
  // };

  // useEffect(() => {
  //   getData(currentPage);
  // }, [searchValue, currentPage]);

  // const handleImageClick = (item) => {
  //   if (!item?.category || !item?.id) {
  //     console.error("Missing required properties in item:", item);
  //     return;
  //   }
  //   navigate(
  //     `/homeImageDetail/${item.category}/${item.id}?page=${currentPage}`
  //   );
  // };

  console.log(data, "xaxa title");
  console.log(searchValue, "searchValue");

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <div>
          <div className={style.wrapper}>
            {data?.map((value, id) => (
              <div key={id} className={style.card}>
                <div className={style.img}>
                  <img
                    onClick={() =>
                      navigate(`/homeImageDetail/${value.category}`)
                    }
                    // src={value.image}
                    src={
                      value.image
                        ? `https://backend.tarixmanba.uz/${value.image}`
                        : frut
                    }
                    alt={value.title}
                  />
                  {/* <img
                    onClick={() => handleImageClick(value)}
                    src={
                      value.image
                        ? `https://backend.tarixmanba.uz/${value.image}`
                        : frut
                    }
                    alt={value.title}
                  /> */}
                </div>

                <div className={style.mediaInfoSection}>
                  <h1>{value.title}</h1>
                  <div className={style.title}>
                    <span>{value?.attributes?.[0]?.title} :</span>
                    <span>{value?.attributes?.[0]?.description}</span>
                  </div>

                  <div className={style.icons}>
                    <span>Eshtuv</span>

                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <BsMic style={{ marginTop: "3px" }} />
                    </span>

                    <span>Surat</span>

                    <span style={{ cursor: value?.galleries && "not-allowed" }}>
                      <BiImages style={{ marginTop: "3px" }} />
                    </span>

                    <span>Matn</span>

                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <BsFillChatTextFill style={{ marginTop: "3px" }} />
                    </span>

                    <span>Xarita</span>

                    <span style={{ cursor: value?.locations && "not-allowed" }}>
                      <LiaGlobeAmericasSolid style={{ marginTop: "5px" }} />
                    </span>

                    <span>3D</span>

                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <LuRotate3D style={{ marginTop: "3px" }} />
                    </span>

                    <span>Ko'ruv</span>

                    <span style={{ cursor: value?.videos && "not-allowed" }}>
                      <AiOutlineEye
                        style={{ fontSize: "25px", marginTop: "8px" }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <ReactPaginate
            previousLabel={<TbPlayerTrackPrevFilled />}
            nextLabel={<TbPlayerTrackNextFilled />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={style.pagination}
            activeClassName={style.active}
            forcePage={currentPage - 1}
          />
        </div>
      ) : (
        <div
          className={style.searchBtn}
          style={{ color: "white", textAlign: "center", marginTop: "15%" }}
        >
          <button onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
          </button>
          {searchValue} so'zli bo'lim yo'q ekan😔😔 iltimos boshqasini qidirib
          ko'rin!
        </div>
      )}
    </div>
  );
}

export default Search;

{
  /* <div
className={style.searchBtn}
style={{ color: "white", textAlign: "center", marginTop: "15%" }}
>
<button onClick={() => navigate(-1)}>
  <FaArrowLeftLong />
</button>
{searchValue} so'zli bo'lim yo'q ekan😔😔 iltimos boshqasini qidirib
ko'rin!
</div> */
}
