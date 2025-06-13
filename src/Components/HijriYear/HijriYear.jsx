import React from "react";
import style from "./hijriYear.module.scss";
import moment from "moment-hijri";

function HijriYear() {
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabiul avval",
    "Raius soniy",
    "Jumodul avval",
    "Jumodus soniy",
    "Rajab",
    "Sha'bon",
    "Ramazon",
    "Shavvol",
    "Zulqa'da",
    "Zulhijja",
  ];

  moment.updateLocale("uz", {
    months:
      "yanvar_fevral_mart_aprel_may_iyun_iyul_avgust_sentyabr_oktabr_noyabr_dekabr".split(
        "_"
      ),
  });

  moment.locale("uz");

  const monthIndex = moment().iMonth(); // Hijriy oy indeksi olish
  const hijriMonth = hijriMonths[monthIndex]; // O'zgaruvchiga Lotin oy nomini olish

  return (
    <div className={style.container}>
      <div className={style["gregorian-year"]}>
        {/* Gregorian data */}
        <div className={style.year}>
          <span>{moment().format("YYYY")}</span>
          <span>- yil</span>
        </div>

        <div className={style.year}>
          <span>{moment().format("D-MMMM", { locale: "uz" })}</span>
        </div>

        <div className={style.lineY}></div>

        {/* Hijriy data */}
        <div className={style.year}>
          <span>{moment().format("iYYYY")}</span>
          <span>- yil</span>
        </div>

        <div className={style.year}>
          <span>
            {moment().format("iDD").startsWith("0")
              ? moment().format("iDD").slice(1)
              : moment().format("iDD")}
          </span>

          <span>- {hijriMonth}</span>
        </div>
      </div>
    </div>
  );
}

export default HijriYear;
