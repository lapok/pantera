import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import UserProfileModal from './userProfileModal';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null); // Добавление состояния для пользователя
  const [showProfile, setShowProfile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // Состояние для модального окна авторизации
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Режим регистрации
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) throw new Error('Ошибка при загрузке профиля');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Ошибка при загрузке пользователя:', err);
        localStorage.removeItem('token');
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    const onProfileClick = (userToView) => {
      setShowProfile(true); // Открываем модальное окно с профилем
    };
  
    const onAuthClick = () => {
      setShowAuthModal(true); // Открываем модальное окно авторизации
    };
  
    const handleCloseProfile = () => {
      setShowProfile(false); // Закрыть модальное окно профиля
    };

  return (
    <> 
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <NavLink to="/">
          <img
            src="/whitelogonocfh.png"
            alt="Pantera logo"
            className={`logo-pantera ${scrolled ? 'scrolled' : ''}`}
          />
        </NavLink>
        <ul className="navbar-items">
          <li className="navbar-item">
            <NavLink to="/news" className={({ isActive }) => isActive ? 'active-nav' : ''}>Новости</NavLink>
          </li>
          <li className="navbar-item">
            <a href="https://panterastore.com/" target="_blank" rel="noopener noreferrer">Магазин</a>
          </li>
          <li className="navbar-item">
            <NavLink to="/discography" className={({ isActive }) => isActive ? 'active-nav' : ''}>Дискография</NavLink>
          </li>
          <li className="navbar-item">
            <a href="https://www.youtube.com/pantera" target="_blank" rel="noopener noreferrer">Видео</a>
          </li>
          <li className="navbar-item">
            <NavLink to="/tours" className={({ isActive }) => isActive ? 'active-nav' : ''}>Туры</NavLink>
          </li>
          <li className="navbar-item dropdown" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <a href="#">Участники &#8964;</a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item"><a href="/dimebagDarrell">Dimebag Darrell</a></li>
                <li className="dropdown-item"><a href="/philiphanselmo">Philip H Anselmo</a></li>
                <li className="dropdown-item"><a href="/rexbrown">Rex Brown</a></li>
                <li className="dropdown-item"><a href="/vinniepaul">Vinnie Paul</a></li>
              </ul>
            )}
          </li>
          {user ? (
            <li className="navbar-item profile-icon" onClick={() => onProfileClick(user)}>
              <span className="avatar-badge">{user.username[0].toUpperCase()}</span>
            </li>
          ) : (
            <li className="navbar-item">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                onAuthClick();
              }}>Авторизация</a>
            </li>
          )}
        </ul>
      </nav>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSwitch={() => setIsRegisterMode((prev) => !prev)}
        isRegisterMode={isRegisterMode}
        onLoginSuccess={fetchUser}
      />

      <UserProfileModal
        isOpen={showProfile}
        onClose={handleCloseProfile}
        user={user}
        onLogout={() => {
          localStorage.removeItem('token');
          setUser(null);
          setShowProfile(false);
        }}
        viewUser={user}
      />
    
    </>
    
  );
  
};

export default Navbar;
