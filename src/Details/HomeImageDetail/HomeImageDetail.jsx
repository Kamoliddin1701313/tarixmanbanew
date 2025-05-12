import { useContext, useEffect, useState } from "react";
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
import Modal from "./Modal/Modal";

function HomeImageDetail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openBox, setOpenBox] = useState(null);
  const [openBoxChog, setOpenBoxChog] = useState(false);

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
    getData(selectedPage);
  };

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

  const onSearchClick = () => {
    setSearchParams({ search: searchText, page: 1 }); // Har doim 1-sahifaga qaytamiz
    saveStateToSessionStorage();
    getData(1);
  };

  const getStoredState = () => {
    try {
      const storedState = sessionStorage.getItem(`filterState_${id}`);

      return storedState ? JSON.parse(storedState) : null;
    } catch (error) {
      console.error("sessionStorage'dan o'qishda xatolik:", error);
      return null;
    }
  };

  const {
    checkedItemsChog,
    setCheckedItemsChog,
    checkedItems,
    setCheckedItems,
    searchText,
    setSearchText,
  } = useContext(ValueContext);

  useEffect(() => {
    const initialState = getStoredState();

    if (initialState?.checkedItems) {
      setCheckedItems(initialState.checkedItems);
    }

    if (initialState?.checkedItemsChog) {
      setCheckedItemsChog(initialState.checkedItemsChog);
    }

    if (initialState?.searchText) {
      setSearchText(initialState.searchText);
    }
  }, []);

  // useEffect(() => {
  //   const storedState = getStoredState();
  //   const searchParam = searchParams.get("search");

  //   if (!storedState && !searchParam) {
  //     setCheckedItems([]);
  //     setCheckedItemsChog([]);
  //     setSearchText("");
  //   } else if (storedState?.searchText) {
  //     setSearchText(storedState.searchText);
  //   }
  // }, [id]);

  const saveStateToSessionStorage = () => {
    try {
      const stateToSave = {
        searchText,
        checkedItems,
        checkedItemsChog,
        currentPage,
      };

      sessionStorage.setItem(`filterState_${id}`, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("SessionStorage'ga yozishda xatolik:", error);
    }
  };

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

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchText(searchParam);
    }
    getData(currentPage);
  }, [id, currentPage, checkedItems, checkedItemsChog, searchParams]);

  const navigateToDetail = (itemId) => {
    saveStateToSessionStorage(); // Navigate qilishdan oldin saqlaymiz
    const params = new URLSearchParams();
    checkedItems.forEach((id) => params.append("filters", id));
    checkedItemsChog.forEach((id) => params.append("period_filter", id));
    if (searchText) params.append("search", searchText);
    params.append("page", currentPage);
    navigate(`/homeImageDetail/${id}/${itemId}?${params.toString()}`);
  };

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

  useEffect(() => {
    saveStateToSessionStorage();
  }, [searchText, checkedItems, checkedItemsChog, currentPage, id]);

  useEffect(() => {
    const storedState = getStoredState();
    const searchParam = searchParams.get("search");

    if (storedState) {
      const params = new URLSearchParams();
      storedState.checkedItems.forEach((id) => params.append("filters", id));
      storedState.checkedItemsChog.forEach((id) =>
        params.append("period_filter", id)
      );
      if (storedState.searchText)
        params.append("search", storedState.searchText);
      params.append("page", storedState.currentPage);

      setSearchParams(params);
    } else if (searchParam) {
      setSearchText(searchParam);
    }

    getData(currentPage);

    // setSearchText("");

    // setCheckedItemsChog([]); //malumot qo'shdim
    // setCheckedItems([]); //malumot qo'shdim
  }, [id]);

  const [views, setViews] = useState(false);

  const ViewsFunction = (id, type) => {
    setViews({
      open: true,
      id: id,
      type: type,
    });
  };

  const clearSessionAndNavigateHome = () => {
    try {
      sessionStorage.removeItem(`filterState_${id}`); // sessionStorage'dan ochirib tashlaymiz
      navigate("/");
    } catch (error) {
      console.error("SessionStorage'ni o'chirishda xatolik:", error);
    }
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam === null || searchParam === "") {
      setSearchText("");
    }
  }, [searchParams]);

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
                        <span onClick={() => handleSelectChog(val.id)}>
                          {val?.title}
                        </span>
                        <label className={style.checkboxWrapper}>
                          <input
                            type="checkbox"
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
                          <span onClick={() => handleSelect(filterItem.id)}>
                            {filterItem.title}
                          </span>

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

          <div className={style.wrapper}>
            {data?.data?.resources?.results?.map((value, idx) => (
              <div key={idx} className={style.card}>
                <div className={style.img}>
                  <img
                    onClick={() => navigateToDetail(value.id)}
                    src={value.image}
                    alt={value.title}
                  />
                </div>

                <div className={style.mediaInfoSection}>
                  <h1>{value.title}</h1>
                  <div className={style.title}>
                    <span>{value?.attributes?.[0]?.title}:</span>
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
        </div>
      ) : (
        <div
          className={style.not_found}
          style={{ color: "white", textAlign: "center", marginTop: "15%" }}
        >
          <button onClick={clearSessionAndNavigateHome}>
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
