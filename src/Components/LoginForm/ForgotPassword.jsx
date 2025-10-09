// src/Components/LoginForm/ForgotPassword.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";

const ForgotPassword = ({ switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      setMessage("Este correo no está registrado.");
      return;
    }

    // Generar código temporal (token)
    const resetToken = Math.random().toString(36).substring(2, 8);
    localStorage.setItem("resetToken", JSON.stringify({ email, resetToken }));

    // Enviar correo con EmailJS
    emailjs.send(
      "TU_SERVICE_ID",
      "TU_TEMPLATE_ID",
      {
        to_email: email,
        reset_code: resetToken,
      },
      "TU_USER_ID"
    )
    .then(() => {
      setMessage("Se envió un correo con instrucciones.");
    })
    .catch(() => {
      setMessage("Error al enviar el correo.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form show">
      <h1>Recuperar Contraseña</h1>
      <div className="input-box">
        <input
          type="email"
          placeholder="Ingrese su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar correo</button>
      {message && <p style={{ color: "blue" }}>{message}</p>}

      <div className="register-link">
        <p><a href="#" onClick={switchToLogin}>Volver al login</a></p>
      </div>
    </form>
  );
};

export default ForgotPassword;
