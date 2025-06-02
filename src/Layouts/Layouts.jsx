import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import { IoMdSettings } from "react-icons/io";
import bgImg1 from "../assets/globalImg/bg-img1.webp";
import bgImg2 from "../assets/globalImg/bg-img2.webp";
import bgImg3 from "../assets/globalImg/bg-img3.webp";
import bgImg4 from "../assets/globalImg/bg-img4.webp";
import bgImg5 from "../assets/globalImg/bg-img5.webp";
import bgImg6 from "../assets/globalImg/bg-img6.webp";
import bgImg7 from "../assets/globalImg/bg-img7.webp";
import style from "./layouts.module.scss";

function Layouts() {
  const [openLink, setOpenLink] = useState(false);

  const images = [
    { id: 1, img: bgImg1 },
    { id: 2, img: bgImg2 },
    { id: 3, img: bgImg3 },
    { id: 4, img: bgImg4 },
    { id: 5, img: bgImg5 },
    { id: 6, img: bgImg6 },
    { id: 7, img: bgImg7 },
  ];

  const [bgImg, setBgImg] = useState(images[0].img);

  // const storedBgImg = localStorage.getItem("img");

  // const [bgImg, setBgImg] = useState(
  //   storedBgImg ? JSON.parse(storedBgImg) : images[0].img
  // );

  // useEffect(() => {
  //   localStorage.setItem("img", JSON.stringify(bgImg));
  // }, [bgImg]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 69) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [btnIcon, setBtnIcon] = useState(true);

  const setBgImgFunction = (img) => {
    setBgImg(img);
    setBtnIcon(true);
  };

  return (
    <div className={style["layouts-container"]}>
      <Navbar openProps={{ openLink, setOpenLink }} />

      <div
        onClick={() => setOpenLink(false)}
        className={style["main-container"]}
        style={{ marginTop: isScrolled && "120px" }}
      >
        <div>
          <img src={bgImg} alt="img" className={style["main-img"]} />
          <div className={style["outlet-container"]}>
            <Outlet />
          </div>
        </div>

        <div
          className={`${style.fixdBox} ${
            btnIcon ? style.closeBox : style.openBox
          }`}
        >
          <div className={style.settingIcon}>
            <IoMdSettings onClick={() => setBtnIcon(!btnIcon)} />
          </div>

          <div className={style.images}>
            <h3>Rasim tanlash</h3>
            <div className={style.activeImg}>
              {images.splice(1).map((img) => (
                <img
                  onClick={() => setBgImgFunction(img.img)}
                  key={img.id}
                  src={img.img}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layouts;
