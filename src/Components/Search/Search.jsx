import React, { useContext, useEffect, useState } from "react";
import style from "./search.module.scss";
import axios from "axios";
import { ValueContext } from "../../App";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import Modal from "../../Details/HomeImageDetail/Modal/Modal";

function Search() {
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useContext(ValueContext);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentPage = Number(searchParams.get("page")) || 1;
  const { pathname } = useLocation();

  const getData = async (Page = 1) => {
    const respons = await axios.get(`search/?page=${Page}&q=${searchValue}`);
    if (respons.statusText) {
      setData(respons?.data?.results);
      setLoading(false);
    }

    setPageCount(Math.ceil(respons?.data?.count / 15));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
  };

  // useEffect(() => {
  //   getData(currentPage);
  // }, [searchValue, currentPage]);

  useEffect(() => {
    if (searchValue) {
      getData(currentPage);
    }
  }, [currentPage, searchValue]);

  const [views, setViews] = useState(false);

  const ViewsFunction = (id, type) => {
    setViews({
      open: true,
      id: id,
      type: type,
    });
  };

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
                    src={
                      value.image
                        ? `https://backend.tarixmanba.uz/${value.image}`
                        : frut
                    }
                    alt={value.title}
                  />
                </div>

                <div className={style.mediaInfoSection}>
                  <h1>{value.title}</h1>
                  <div className={style.title}>
                    <span>{value?.attributes?.[0]?.title} :</span>
                    <span>{value?.attributes?.[0]?.description}</span>
                  </div>

                  <div className={style.icons}>
                    <span
                      style={{
                        color:
                          value?.audios?.length > 0 ? "white" : "#ffffff89",
                      }}
                    >
                      Eshtuv
                    </span>

                    <span>
                      <BsMic
                        style={{
                          cursor:
                            value?.audios?.length === Number(0)
                              ? "not-allowed"
                              : "pointer",
                          color:
                            value?.audios?.length > 0 ? "white" : "#ffffff89",
                          marginTop: "3px",
                        }}
                        onClick={
                          value?.audios?.length !== 0
                            ? () => ViewsFunction(value.id, "audios")
                            : undefined
                        }
                      />
                      {views?.open && views?.id === Number(value.id) && (
                        <Modal
                          data={{
                            value,
                            views,
                            setViews,
                            type: "audios",
                            valueId: value.id,
                          }}
                        />
                      )}
                    </span>

                    <span
                      style={{
                        color:
                          value?.galleries?.length > 0 ? "white" : "#ffffff89",
                      }}
                    >
                      Surat
                    </span>

                    <span>
                      <BiImages
                        style={{
                          cursor:
                            value?.galleries?.length === Number(0)
                              ? "not-allowed"
                              : "pointer",
                          color:
                            value?.galleries?.length > 0
                              ? "white"
                              : "#ffffff89",
                          marginTop: "3px",
                        }}
                        onClick={
                          value?.galleries?.length !== 0
                            ? () => ViewsFunction(value.id, "galleries")
                            : undefined
                        }
                      />
                      {views?.open && views?.id === Number(value.id) && (
                        <Modal
                          data={{
                            value,
                            views,
                            setViews,
                            type: "galleries",
                            valueId: value.id,
                          }}
                        />
                      )}
                    </span>

                    <span
                      style={{
                        color:
                          value?.contents?.length > 0 ? "white" : "#ffffff89",
                      }}
                    >
                      Matn
                    </span>

                    <span>
                      <BsFillChatTextFill
                        style={{
                          cursor:
                            value?.contents?.length === Number(0)
                              ? "not-allowed"
                              : "pointer",
                          color:
                            value?.contents?.length > 0 ? "white" : "#ffffff89",
                          marginTop: "3px",
                        }}
                        onClick={
                          value?.contents?.length !== 0
                            ? () => ViewsFunction(value.id, "contents")
                            : undefined
                        }
                      />
                      {views?.open && views?.id === Number(value.id) && (
                        <Modal
                          data={{
                            value,
                            views,
                            setViews,
                            type: "contents",
                            valueId: value.id,
                          }}
                        />
                      )}
                    </span>

                    <span
                      style={{
                        color:
                          value?.locations?.length > 0 ? "white" : "#ffffff89",
                      }}
                    >
                      Xarita
                    </span>

                    <span>
                      <LiaGlobeAmericasSolid
                        style={{
                          cursor:
                            value?.locations?.length === Number(0)
                              ? "not-allowed"
                              : "pointer",
                          color:
                            value?.locations?.length > 0
                              ? "white"
                              : "#ffffff89",
                          marginTop: "3px",
                        }}
                        onClick={
                          value?.locations?.length !== 0
                            ? () => ViewsFunction(value.id, "locations")
                            : undefined
                        }
                      />
                      {views?.open && views?.id === Number(value.id) && (
                        <Modal
                          data={{
                            value,
                            views,
                            setViews,
                            type: "locations",
                            valueId: value.id,
                          }}
                        />
                      )}
                    </span>

                    <span
                      style={{
                        color:
                          value?.locations?.length > 0 ? "white" : "#ffffff89",
                      }}
                    >
                      3D
                    </span>

                    <span>
                      <LuRotate3D
                        style={{
                          cursor:
                            value?.locations?.length === Number(0)
                              ? "not-allowed"
                              : "pointer",
                          color:
                            value?.locations?.length > 0
                              ? "white"
                              : "#ffffff89",
                          marginTop: "3px",
                        }}
                        onClick={
                          value?.locations?.length !== 0
                            ? () => ViewsFunction(value.id, "locations")
                            : undefined
                        }
                      />
                      {views?.open && views?.id === Number(value.id) && (
                        <Modal
                          data={{
                            value,
                            views,
                            setViews,
                            type: "3d",
                            valueId: value.id,
                          }}
                        />
                      )}
                    </span>

                    <span
                      style={{
                        color:
                          value?.videos?.length > 0 ? "white" : "#ffffff89",
                      }}
                    >
                      Ko'ruv
                    </span>

                    <span>
                      <AiOutlineEye
                        style={{
                          cursor:
                            value?.videos?.length === Number(0)
                              ? "not-allowed"
                              : "pointer",
                          color:
                            value?.videos?.length > 0 ? "white" : "#ffffff89",
                          fontSize: "22px",
                          marginTop: "3px",
                        }}
                        onClick={
                          value?.videos?.length !== 0
                            ? () => ViewsFunction(value.id, "videos")
                            : undefined
                        }
                      />
                      {views?.open && views?.id === Number(value.id) && (
                        <Modal
                          data={{
                            value,
                            views,
                            setViews,
                            type: "videos",
                            valueId: value.id,
                          }}
                        />
                      )}
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
          {pathname === "/search" ? (
            <button onClick={() => navigate("/")}>
              <FaArrowLeftLong />
            </button>
          ) : (
            <button onClick={() => setSearchValue("")}>
              <FaArrowLeftLong />
            </button>
          )}
          {searchValue} so'zli bo'lim yo'q ekan😔😔 iltimos boshqasini qidirib
          ko'rin!
        </div>
      )}
    </div>
  );
}

export default Search;
