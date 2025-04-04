import React, { useState } from 'react';
import './main-window.css';

const AuthModal = ({ isOpen, onClose, onSwitch, isRegisterMode, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegisterMode ? 'http://localhost:5000/api/register' : 'http://localhost:5000/api/login';

    const payload = isRegisterMode
      ? { username, email, password }
      : { username, password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('✅ Ответ от сервера:', data);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess();
        onClose();

      } else {
        alert(data.message || 'Ошибка');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка подключения');
    }
    
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>{isRegisterMode ? 'Регистрация' : 'Авторизация'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegisterMode ? (
            <>
              <input
                type='text'
                placeholder='Логин'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type='password'
                placeholder='Пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <input
                type='text'
                placeholder='Логин'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type='password'
                placeholder='Пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          <button type='submit'>{isRegisterMode ? 'Зарегистрироваться' : 'Войти'}</button>
        </form>
        <p>
          {isRegisterMode ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <span className='switch-link' onClick={onSwitch}>
            {isRegisterMode ? 'Войти' : 'Зарегистрироваться'}
          </span>
        </p>
        <button onClick={onClose} className='close-button'>Закрыть</button>
      </div>
    </div>
  );
};

export default AuthModal;
