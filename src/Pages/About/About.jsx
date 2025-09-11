import { useEffect, useState } from "react";
import style from "./about.module.scss";
import axios from "axios";
import Loading from "../../Loading/Loading";
import ReactPaginate from "react-paginate";
import logo from "./logo.png";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

function About() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getData = async (Page = 1) => {
    try {
      const respons = await axios.get(`/employee/?page=${Page}`);
      if (respons.status) {
        setData(respons.data.results);
        setPageCount(Math.ceil(respons.data.count / 10));
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : data.length ? (
        <div>
          {/* <div className={style.lineX}></div> */}

          <div className={style.about_text}>
            <h2>
              “O‘zbek xalqi va davlatchiligi tarixi manbalari (eng qadimgi
              davrdan 1991 yilgacha)” elektron platformasi” yaratuvchilari
            </h2>
            <p>
              Turon-Turkiston tarixiga oid barcha turdagi manbalar – arxeologiya
              va me’morchilik yodgorliklari, tangalar, bitiklar, qo‘lyozma va
              toshbosma asarlar, tarixiy va arxiv hujjatlari, san’at asarlari,
              xaritalar, gazeta, jurnallar, xalq og‘zaki ijodi namunalari
              bo‘yicha birlamchi to‘liq ma’lumotlarni taqdim etib boradigan
              “O‘zbek xalqi va davlatchiligi tarixi manbalari (eng qadimgi
              davrdan 1991 yilgacha)” elektron platformasi 2021 – 2024 yillari
              Tarix institutida Oliy ta’lim, fan va innovatsiyalar vazirligi
              buyurtmasiga ko‘ra “O‘zbek xalqi va davlatchiligi tarixi manbalari
              (eng qadimgi davrlardan 1991 yilgacha) elektron “Aqlli kutubxona”
              amaliy loyihasi doirasida yaratildi.
            </p>
          </div>

          <h1 className={style.users}>Loyiha qatnashchilari</h1>

          <div className={style.cards}>
            {data
              ?.sort((a, b) => a.order - b.order)
              .map((value, idx) => (
                <div key={idx} className={style.card}>
                  <img
                    decoding="async"
                    src={"https://backend.tarixmanba.uz" + value.image}
                    alt={value.full_name}
                  />
                  <div className={style.description}>
                    <h3>{value.full_name}</h3>
                    <h4>{value.degree}</h4>
                  </div>
                </div>
              ))}
          </div>

          <ReactPaginate
            previousLabel={<TbPlayerTrackPrevFilled />}
            nextLabel={<TbPlayerTrackNextFilled />}
            breakLabel={"..."}
            pageCount={pageCount} // Jami sahifalar soni
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick} // Sahifa almashganda
            containerClassName={style.pagination}
            activeClassName={style.active}
            forcePage={currentPage - 1}
          />

          <div className={style.location_about}>
            <div className={style.location}>
              <img loading="lazy" decoding="async" src={logo} alt="logo" />
              <h1>Biz haqimizda</h1>
              <h1>
                O‘zbekiston Respublikasi Fanlar akademiyasi Tarix instituti
              </h1>
              <p>
                100060, Toshkent sh., Mirobod tumani Shahrisabz tor ko‘chasi,
                5-uy
              </p>
              <p>Telefon: (+998 71) 233-54-70</p>
              <p>Faks: (+998 71) 233-39-91</p>

              <p>
                Rasmiy sayt: <a href="https://fati.uz">fati.uz</a>
              </p>
            </div>

            <div className={style.iframe}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1424.4225438045685!2d69.28364683880497!3d41.30579324282757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sO%E2%80%98zbekiston%20Respublikasi%20Fanlar%20akademiyasi%20Tarix%20instituti!5e1!3m2!1sen!2s!4v1757408337223!5m2!1sen!2s"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: "none" }}
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        "salomat"
      )}
    </div>
  );
}

export default About;
