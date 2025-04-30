import React, { useEffect, useState } from "react";
import style from "./navbarLogoSlider.module.scss";
import lent1 from "./img/lenta1.png";
import lent2 from "./img/lenta2.png";
import lent3 from "./img/lenta3.png";
import lent4 from "./img/lenta4.png";
import lent5 from "./img/lenta5.png";
import lent6 from "./img/lenta6.png";
import lent7 from "./img/lenta7.png";

function NavbarLogoSlider() {
  const img = [
    { id: 1, img: lent1 },
    { id: 2, img: lent2 },
    { id: 3, img: lent3 },
    { id: 4, img: lent4 },
    { id: 5, img: lent5 },
    { id: 6, img: lent6 },
    { id: 7, img: lent7 },
  ];

  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= 69) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <div className={style.marquee}>
      {[...Array(8)]
        .flatMap(() => img)
        .map((item, index) => (
          <img key={index} src={item.img} alt={`img-${index}`} />
        ))}
    </div>
  );
}

export default NavbarLogoSlider;
