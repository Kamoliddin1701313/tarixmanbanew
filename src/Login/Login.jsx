import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./login.module.scss";

function Login() {
  const [phone, setPhone] = useState("");
  const [parol, setParol] = useState("");
  const [loginParol, setLoginParol] = useState(true);
  const navigate = useNavigate();

  const HandeSubmit = (event) => {
    event.preventDefault();

    if (phone == "1" && parol == "1") {
      localStorage.setItem("parol", "parol");
      toast.success("Muvaffaqiyatli kirdingiz!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setLoginParol(false);
    }
  };

  return (
    <div className={style["login-container"]}>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <form onSubmit={HandeSubmit} className={style.login}>
        <h1>Hisobingizga kiring!</h1>
        <div className={style.inputCard}>
          <label className={style.label} htmlFor="phone">
            Telefon raqam:
          </label>

          <input
            id="phone"
            value={phone}
            type="text"
            placeholder="Admin bo'lib kiring? Tel:"
            onChange={({ target: { value } }) => setPhone(value)}
            required
          />
          <span style={{ marginTop: "6px", color: "#ff0000db" }}>
            {!loginParol && "Telefon raqam mos kelmadi!"}
          </span>
        </div>

        <div className={style.inputCard}>
          <label className={style.label} htmlFor="phone">
            Parol:
          </label>
          <input
            value={parol}
            type="text"
            placeholder="Parolni kiriting"
            onChange={({ target: { value } }) => setParol(value)}
            required
          />
          <span style={{ marginTop: "6px", color: "#ff0000db" }}>
            {!loginParol && "Parol mos kelmadi!"}
          </span>
        </div>

        <button className={style.loginBtn} type="submit">
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default Login;
