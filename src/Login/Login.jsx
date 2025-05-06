import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [parol, setParol] = useState("");
  const [loginParol, setLoginParol] = useState(true);
  const navigate = useNavigate();

  const HandeSubmit = (event) => {
    event.preventDefault();

    if (phone == "911111111" && parol == "12345678") {
      localStorage.setItem("parol", "parol");
      toast.success("Muvaffaqiyatli kirdingiz!");
      navigate("/");
    } else {
      setLoginParol(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={HandeSubmit}>
        <div>
          <input
            value={phone}
            type="text"
            placeholder="Admin bo'lib kiring? Tel:"
            onChange={({ target: { value } }) => setPhone(value)}
            required
          />
          <span>{loginParol && "Telefon raqam mos kelmadi!"}</span>
        </div>

        <div>
          <input
            value={parol}
            type="text"
            placeholder="Parolni kiriting"
            onChange={({ target: { value } }) => setParol(value)}
            required
          />
          <span>{loginParol && "Parol mos kelmadi!"}</span>
        </div>

        <button type="submit">Yuborish</button>
      </form>
    </div>
  );
}

export default Login;
