import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EmailVerification.css'; // Importa el archivo CSS personalizado

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(120);
  const [showResendButton, setShowResendButton] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    address: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/login');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
        await axios.post('http://localhost:8080/api/users/sendVerificationCode', { email });
        toast.success('Se ha enviado un código de verificación a tu email.');
        setShowVerificationForm(true);
        setResendTimeout(120);
        setShowResendButton(false);
        setVerificationCode('');
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data === 'El email ya está registrado.') {
            toast.error('El email ya está registrado.');
        } else {
            toast.error('Error al enviar el código de verificación.');
        }
    } finally {
        setIsSending(false);
    }
};


  const handleResendCode = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await axios.post('http://localhost:8080/api/users/sendVerificationCode', { email });
      toast.success('Se ha enviado un nuevo código de verificación a tu email.');
      setResendTimeout(120);
      setShowResendButton(false);
      setVerificationCode('');
    } catch (error) {
      toast.error('Error al enviar el nuevo código de verificación.');
    } finally {
      setIsSending(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/verifyCode', { email, verificationCode });
      if (response.status === 200) {
        setIsVerified(true);
        toast.success('Código verificado correctamente.');
      } else {
        toast.error('Código de verificación incorrecto.');
      }
    } catch (error) {
      toast.error('Error al verificar el código.');
    }
  };

  useEffect(() => {
    let timer;
    if (showVerificationForm && !isVerified) {
      timer = setInterval(() => {
        setResendTimeout(prevTimeout => {
          if (prevTimeout > 0) {
            return prevTimeout - 1;
          } else {
            clearInterval(timer);
            setShowResendButton(true);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showVerificationForm, isVerified]);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/register', { ...formData, email });
      toast.success('Registro exitoso.');
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (error) {
      toast.error('Error al registrar usuario.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <ToastContainer />
        {!showVerificationForm && !isVerified && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-center mb-4">Ingrese su correo Electrónico</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary btn-custom-spacing" disabled={isSending}>
                Continuar
              </button>
              <button type="button" className="btn btn-secondary btn-cancel-custom" onClick={handleCancel} disabled={isSending}>
                Cancelar
              </button>
            </div>
          </form>
        )}
        {showVerificationForm && !isVerified && (
          <>
            <form onSubmit={handleVerificationSubmit}>
              <div className="mb-3">
                <label htmlFor="verificationCode" className="form-label">Código de verificación:</label>
                <input
                  type="text"
                  className="form-control"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary btn-custom-spacing">Verificar</button>
                <button type="button" className="btn btn-secondary btn-cancel-custom" onClick={handleCancel} disabled={isSending}>
                  Cancelar
                </button>
              </div>
            </form>
            <p className="mt-3">Tiempo restante: {resendTimeout} segundos</p>
            {showResendButton && (
              <button onClick={handleResendCode} className="btn btn-link" disabled={isSending}>
                Volver a Enviar Código
              </button>
            )}
          </>
        )}
        {isVerified && (
          <form onSubmit={handleRegistrationSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input
              type="text"
              className="form-control custom-form-control"
              id="name"
              name="name"
              value={formData.name}
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
            <input
              type="password"
              className="form-control custom-form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword && (
              <p style={{ color: passwordMatch ? 'green' : 'red' }}>
                {passwordMatch ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección:</label>
            <input
              type="text"
              className="form-control custom-form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary btn-custom-spacing custom-btn" disabled={!passwordMatch}>
              Registrar
            </button>
            <button type="button" className="btn btn-secondary custom-btn btn-cancel-custom" onClick={handleCancel} disabled={isSending}>
              Cancelar
            </button>
          </div>
        </form>        
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
