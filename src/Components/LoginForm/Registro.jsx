// src/Components/LoginForm/Registro.jsx
import React, { useState } from 'react';
import { FaUserAstronaut, FaLock } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import './Estilos_Generales.css';

const Registro = ({ onRegister, switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = storedUsers.some(user => user.email === email);
    if (userExists) {
      setError("Este correo ya está registrado");
      return;
    }

    const newUser = { username, email, password };
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    setError("");
    onRegister(newUser);
  };

  return (
    <form onSubmit={handleRegister} className="form show">
      <h1>Registro</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FaUserAstronaut className="icon" />
      </div>

      <div className="input-box">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <MdAttachEmail className="icon" />
      </div>

      <div className="input-box">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FaLock className="icon" />
      </div>

      <div className="input-box">
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <FaLock className="icon" />
      </div>

      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      <button type="submit">Registrarse</button>

      <div className="register-link">
        <p>¿Ya tiene una cuenta? <a href="#" onClick={switchToLogin}>Iniciar sesión</a></p>
      </div>
    </form>
  );
};

export default Registro;
