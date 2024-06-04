import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(""); // Limpiar el nombre del usuario al cerrar sesión
    // Lógica adicional para limpiar la sesión, si es necesario
  };

  // Función para establecer el nombre del usuario después del inicio de sesión
  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name); // Establecer el nombre del usuario después del inicio de sesión
  };

  return (
    <Router>
      <div>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home onLogout={handleLogout} name={userName} /> // Pasar el nombre del usuario al componente Home
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />} // Pasar la función handleLogin al componente Login
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
