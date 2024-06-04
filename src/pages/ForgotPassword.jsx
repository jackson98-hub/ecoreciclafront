import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ForgotPassword.css'; // Importa el archivo CSS personalizado

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await axios.post('http://localhost:8080/api/users/forgot-password', { email });
      toast.success('Se ha enviado un enlace de recuperación de contraseña a tu email.', {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error('Error al enviar el enlace de recuperación. Por favor, verifica tu correo electrónico.', {
        autoClose: 3000,
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control input-custom-size" // Aplica la clase personalizada
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary btn-custom-spacing" disabled={isSending}>
              {isSending ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
            </button>
            <button type="button" className="btn btn-secondary btn-cancel-custom" onClick={handleCancel} disabled={isSending}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
