import React, { useContext } from "react";
import style from "./header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import TimeClock from "../TimeClock/TimeClock";
import { ValueContext } from "../../App";
import { FaBarsStaggered } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import HijriYear from "../HijriYear/HijriYear";
import WeatherApp from "../WeatherApp/WeatherApp";

// const Header = ({ openIcon, setOpenIcon, setOpenLink }) => {
//   const navigate = useNavigate();
//   const { searchValue, setSearchValue } = useContext(ValueContext);

//   const openBtn = () => {
//     setOpenIcon(!openIcon);
//     setOpenLink(false);
//   };

//   return (
//     <div className={style.container}>
//       <div className={style.header}>
//         <div>
//           <Link onClick={() => setSearchValue("")} to="/">
//             AQLLI KUTUBXONA
//           </Link>
//         </div>

//         <div
//           className={`${style["info-panel"]} ${openIcon && style["openPanel"]}`}
//         >
//           <div className={style["datetime-weather"]}>
//             <TimeClock />
//             <HijriYear />
//             <WeatherApp />
//           </div>

//           <div className={style.search}>
//             <input
//               type="text"
//               placeholder="Qidirish..."
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   navigate("/search"); // Search sahifasiga o'tish
//                 }
//               }}
//             />
//             <FcSearch
//               onClick={() => {
//                 navigate("/search");
//               }}
//             />
//           </div>
//         </div>

//         <button onClick={() => openBtn()}>
//           {openIcon ? <GrClose /> : <FaBarsStaggered />}
//         </button>
//       </div>
//     </div>
//   );
// };

// yyyyyyyyyy

const Header = React.memo(({ openIcon, setOpenIcon, setOpenLink }) => {
  const navigate = useNavigate();
  const { setSearchValue, tempSearchValue, setTempSearchValue } =
    useContext(ValueContext);

  const openBtn = () => {
    setOpenIcon(!openIcon);
    setOpenLink(false);
  };

  const handleSearch = () => {
    setSearchValue(tempSearchValue);
    navigate("/search");
  };

  const inputClearInValue = () => {
    // setSearchValue(""); o'chirilmasin
    setTempSearchValue("");
  };

  // console.log(tempSearchValue, "tempSearchValue");

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <Link onClick={inputClearInValue} to="/">
            AQLLI KUTUBXONA
          </Link>
        </div>

        <div
          className={`${style["info-panel"]} ${openIcon && style["openPanel"]}`}
        >
          <div className={style["datetime-weather"]}>
            <TimeClock />
            <HijriYear />
            <WeatherApp />
          </div>

          <div className={style.search}>
            <input
              type="text"
              placeholder="Qidirish..."
              value={tempSearchValue}
              onChange={(e) => setTempSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <FcSearch onClick={handleSearch} />
          </div>
        </div>

        <button onClick={() => openBtn()}>
          {openIcon ? <GrClose /> : <FaBarsStaggered />}
        </button>
      </div>
    </div>
  );
});

export default React.memo(Header);
