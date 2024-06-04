import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.', {
        autoClose: 3000,
      });
      setIsSending(false);
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/users/reset-password/${token}`, { newPassword: password });
      toast.success('Contraseña restablecida correctamente.', {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error('Error al restablecer la contraseña.', {
        autoClose: 3000,
      });
      setIsSending(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center mb-4">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Nueva Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {passwordsMatch !== null && (
            <div className={`mb-3 ${passwordsMatch ? 'text-success' : 'text-danger'}`}>
              {passwordsMatch ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100" disabled={isSending || !passwordsMatch}>
            {isSending ? 'Enviando...' : 'Restablecer Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
