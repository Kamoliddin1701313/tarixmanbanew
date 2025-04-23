import React, { useContext, useEffect, useState } from "react";
import style from "./homeImageDetail.module.scss";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { BsMic, BsFillChatTextFill } from "react-icons/bs";
import { BiImages } from "react-icons/bi";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { LuRotate3D } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import Loading from "../../Loading/Loading";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ValueContext } from "../../App";

function HomeImageDetail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openBox, setOpenBox] = useState(null);
  const [openBoxChog, setOpenBoxChog] = useState(false);

  const [searchText, setSearchText] = useState("");
  const { searchValue } = useContext(ValueContext);

  const currentPage = Number(searchParams.get("page")) || 1;

  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedItemsChog, setCheckedItemsChog] = useState([]);
  const handleSelect = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectChog = (id) => {
    setCheckedItemsChog((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // const getData = async (Page = 1) => {
  //   try {
  //     // const query = checkedItems
  //     //   .map((id) => `filters=${id}`).join("&");
  //     //   `category-resource/${id}/?${query}&search=${searchText}&page=${Page}`

  //     const filtersQuery = checkedItems.map((id) => `filters=${id}`).join("&");
  //     const periodQuery = `period_filter=${idx}`;
  //     const finalQuery = `${filtersQuery}&${periodQuery}&search=${searchText}&page=${Page}`;
  //     const respons = await axios.get(`category-resource/${id}/?${finalQuery}`);

  //     setPageCount(Math.ceil(respons?.data?.resources?.count / 20));
  //     if (respons.status) {
  //       setData(respons);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getData = async (Page = 1) => {
  //   try {
  //     const filtersQuery = checkedItems.map((id) => `filters=${id}`).join("&");
  //     const periodQuery = checkedItemsChog
  //       .map((id) => `period_filter=${id}`)
  //       .join("&");

  //     const finalQuery = `${filtersQuery}&${periodQuery}&search=${searchText}&page=${Page}`;

  //     const respons = await axios.get(`category-resource/${id}/?${finalQuery}`);

  //     setPageCount(Math.ceil(respons?.data?.resources?.count / 20));
  //     if (respons.status) {
  //       setData(respons);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // COPYASI
  const getData = async (Page = 1) => {
    try {
      const filtersQuery = checkedItems.map((id) => `filters=${id}`).join("&");
      const periodQuery = checkedItemsChog
        .map((id) => `period_filter=${id}`)
        .join("&");

      const searchQuery = searchText ? `search=${searchText}` : "";

      const finalQuery = [filtersQuery, periodQuery, searchQuery]
        .filter(Boolean)
        .join("&");

      const respons = await axios.get(
        `category-resource/${id}/?${finalQuery}&page=${Page}`
      );

      // Paginatsiyani to'g'ri hisoblash
      const totalCount = respons?.data?.resources?.count || 0;
      setPageCount(Math.ceil(totalCount / 20));

      if (respons.status) {
        setData(respons);
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
    getData(selectedPage);
  };

  // useEffect(() => {
  //   getData(currentPage);
  // }, [id, currentPage, checkedItems, checkedItemsChog]);
  // COPYASI
  useEffect(() => {
    // URLdan search parametrini o'qiymiz
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchText(searchParam);
    }
    getData(currentPage);
  }, [id, currentPage, checkedItems, checkedItemsChog, searchParams]);

  // useEffect(() => {
  //   getData();
  // }, [checkedItems, checkedItemsChog]);

  const result = data.data?.filter_categories.map((category) => {
    return {
      ...category,
      filters: data.data?.filters.filter(
        (filter) => Number(filter.filter_category) === Number(category.id)
      ),
    };
  });

  const ToggleBtn = (id) => {
    setOpenBox((prevId) => (prevId === id ? null : id));
  };

  // const onSearchClick = () => {
  //   // if (searchText.trim() !== "") {
  //   // }
  //   getData();
  //   setSearchText("");
  // };

  // COPYASI
  const onSearchClick = () => {
    setSearchParams({ search: searchText, page: 1 }); // Har doim 1-sahifaga qaytamiz
    getData(1);
  };

  console.log(data, "DATA XXXX");
  console.log(result, "RESULTS XXXX");

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : data?.data?.resources?.results.length > 0 ? (
        <div className={style.innerContainer}>
          <div className={style.description}>
            <h1>{data?.data?.category}</h1>
            <div className={style.search}>
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  // Agar input bo'sh bo'lsa, qidiruvni bekor qilamiz
                  if (e.target.value.trim() === "") {
                    setSearchParams({ page: 1 });
                    getData(1);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearchClick();
                  }
                }}
              />
              <FcSearch onClick={onSearchClick} />
            </div>

            <div className={style.acardion}>
              <div className={style.accordionItem}>
                <button>
                  <span>Chog'lar</span>

                  <span
                    onClick={() => setOpenBoxChog(!openBoxChog)}
                    style={{
                      transform: openBoxChog && "rotate(180deg)",
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {data.data?.period_filters?.map((val, idx) => (
                  <div key={idx}>
                    <div
                      className={`${style.accordionContent} ${
                        openBoxChog ? style.openBox : style.closeBox
                      }`}
                    >
                      <div className={style.accordionHeader}>
                        <span>{val?.title}</span>
                        {/* {console.log(val, "val")} */}
                        <label className={style.checkboxWrapper}>
                          <input
                            type="checkbox"
                            // checked={checkedItems.includes(val.id)}
                            // onChange={() => handleSelect(val.id)}
                            checked={checkedItemsChog.includes(val.id)}
                            onChange={() => handleSelectChog(val.id)}
                          />
                          <span className={style.customCheckbox}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={style.accordionItem}>
                {result?.map((filterCategory, idx) => (
                  <div key={idx}>
                    <button onClick={() => ToggleBtn(filterCategory.id)}>
                      <span>{filterCategory.title}</span>
                      <span
                        style={{
                          transform:
                            openBox == filterCategory.id && "rotate(180deg)",
                          transition: "transform 0.3s ease",
                          display: "inline-block",
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    <div
                      className={`${style.accordionContent} ${
                        openBox === filterCategory.id
                          ? style.openBox
                          : style.closeBox
                      }`}
                    >
                      {filterCategory.filters.map((filterItem, subIdx) => (
                        <div key={subIdx} className={style.accordionHeader}>
                          <span>{filterItem.title}</span>
                          {/* {console.log(
                            filterItem,
                            "filterItemlllllllllllllllllll"
                          )} */}
                          <label className={style.checkboxWrapper}>
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(filterItem.id)}
                              onChange={() => handleSelect(filterItem.id)}
                            />
                            <span className={style.customCheckbox}></span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* {console.log(data, "Islamov Kamoliddin")} */}
          <div className={style.wrapper}>
            {data?.data?.resources?.results?.map((value, idx) => (
              <div key={idx} className={style.card}>
                <div>
                  <img
                    onClick={() => navigate(`${value.id}?page=${currentPage}`)}
                    src={value.image}
                    alt={value.title}
                  />
                  {/* salom hammaga */}

                  {/* variyanlari */}
                  {/* <img
                    onClick={() =>
                      navigate(
                        // `/homeImageDetail/${id}/${value.id}?page=${currentPage}`
                        `/homeImageDetail/${id}/${value.id}`
                      )
                    }
                    src={value.image}
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
                      <LiaGlobeAmericasSolid style={{ marginTop: "3px" }} />
                    </span>

                    <span>3D</span>

                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <LuRotate3D style={{ marginTop: "3px" }} />
                    </span>

                    <span>Ko'ruv</span>

                    <span style={{ cursor: value?.videos && "not-allowed" }}>
                      <AiOutlineEye
                        style={{ fontSize: "22px", marginTop: "3px" }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={style.not_found}
          style={{ color: "white", textAlign: "center", marginTop: "15%" }}
        >
          <button onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
          </button>
          {data?.data?.category} bo'limida bunday ma'lumotlar yo'q ekan 😔😔
        </div>
      )}

      {data?.data?.resources?.results.length > 0 && (
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
      )}
    </div>
  );
}

export default HomeImageDetail;
