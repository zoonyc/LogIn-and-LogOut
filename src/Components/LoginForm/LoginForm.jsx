// src/Components/LoginForm/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import './Estilos_Generales.css';
import { FaUserAstronaut, FaLock } from "react-icons/fa";
import Registro from './Registro';

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  // Revisar si hay usuario logueado al cargar
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setDisplayName(loggedUser.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setDisplayName(user.username);
      setIsLoggedIn(true);
      setError("");
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setDisplayName("");
    localStorage.removeItem("loggedUser");
  };

  const handleRegister = (newUser) => {
    setDisplayName(newUser.username);
    setIsLoggedIn(true);
    setIsRegistering(false);
    localStorage.setItem("loggedUser", JSON.stringify(newUser));
  };

  return (
    <div className="wrapper">
      {!isLoggedIn && !isRegistering && (
        <form onSubmit={handleLogin} className="form show">
          <h1>Ingresar</h1>

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
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

          <div className="remember-forgot">
            <label><input type="checkbox" />Recordar datos</label>
            <a href="#">¿Olvidó su contraseña?</a>
          </div>

          <button type="submit">Iniciar sesión</button>

          <div className="register-link">
            <p>¿No tiene una cuenta? <a href="#" onClick={() => setIsRegistering(true)}>Registrar</a></p>
          </div>
        </form>
      )}

      {!isLoggedIn && isRegistering && (
        <Registro
          onRegister={handleRegister}
          switchToLogin={() => setIsRegistering(false)}
        />
      )}

      {isLoggedIn && (
        <div className="welcome-message fade-in">
          <h2>Bienvenido, {displayName} 👋</h2>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
