import React, { useContext, useEffect, useState } from "react";
import style from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import TimeClock from "../TimeClock/TimeClock";
import { ValueContext } from "../../App";
import { FaBarsStaggered } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import HijriYear from "../HijriYear/HijriYear";
import WeatherApp from "../WeatherApp/WeatherApp";

const Header = ({ openIcon, setOpenIcon }) => {
  const navigate = useNavigate();
  const { searchValue, setSearchValue } = useContext(ValueContext);
  // const [openIcon, setOpenIcon] = useState(false);
  // const [search, setSearch] = useState("");

  // const onSearch = () => {
  //   console.log(searchValue, "search");
  //   getData();
  //   setSearchValue("");
  // };

  // console.log(searchValue, "contextValue ");

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <Link to="/">AQLLI KUTUBXONA</Link>
        </div>

        <div
          className={`${style["info-panel"]} ${openIcon && style["openPanel"]}`}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <TimeClock />
            <HijriYear />
            {/* <WeatherApp /> */}
          </div>

          {/* <div className={style.search}>
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // onSearch();
                }
              }}
            />
            <FcSearch onClick={() => navigate("/search")} />
          </div> */}
          {/* VARIYANTGA */}
          <div className={style.search}>
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/search"); // Search sahifasiga o'tish
                }
              }}
            />
            <FcSearch onClick={() => navigate("/search")} />
          </div>
        </div>

        <button onClick={() => setOpenIcon(!openIcon)}>
          {openIcon ? <GrClose /> : <FaBarsStaggered />}
        </button>
      </div>
    </div>
  );
};

export default Header;
