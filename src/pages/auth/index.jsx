import React, { useState, useContext } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../services/login';
import { UserContext } from '../../context/userContext'; // Contexto del usuario

const Login = () => {
  const initialLoginData = {
    email: '',
    password: ''
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(''); // Mensaje de error del servidor
  const navigate = useNavigate();
  const { login } = useLogin(); // Hook personalizado para realizar el login
  const { login: contextLogin } = useContext(UserContext); // Accede a la función `login` del contexto

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        newErrors[name] = value.trim() === '' ? 'Email is required' : '';
        if (value.trim() !== '' && !validateEmail(value)) {
          newErrors[name] = 'Please enter a valid email address';
        }
        break;
      case 'password':
        newErrors[name] = value.trim() === '' ? 'Password is required' : '';
        if (value.trim() !== '' && value.length < 8) {
          newErrors[name] = 'Password must be at least 8 characters long';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Llamar a la función de login
    const result = await login(email, password);

    if (result.success) {
      navigate('/api/get');
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        {serverError && <p className="error-message">{serverError}</p>}
      </form>
    </div>
  );
};

export default Login;
