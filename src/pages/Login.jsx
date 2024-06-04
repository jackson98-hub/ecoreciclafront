import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos los estilos de Bootstrap
import '../styles/Login.css'; // Importamos tus estilos personalizados

function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData);
      console.log('Response from server:', response); // Aquí imprimimos la respuesta del servidor
      if (response.status === 200) {
        const { name } = response.data.user;
        console.log('User name:', name); // Aquí imprimimos el nombre del usuario
        if (onLogin) {
          onLogin(name);
        }
        toast.success('Inicio de sesión exitoso.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error during login:', error); // Aquí imprimimos cualquier error que ocurra durante el inicio de sesión
      toast.error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 custom-card">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              className="form-control custom-form-control" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input 
              type="password" 
              className="form-control custom-form-control" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 custom-btn">Iniciar Sesión</button>
        </form>
        <div className="text-center mt-3">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className="text-center mt-3">
          <Link to="/email-verification">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
