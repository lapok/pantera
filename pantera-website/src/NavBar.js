import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ user, onProfileClick, onAuthClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
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
          <li className="navbar-item"><a href="https://panterastore.com/">Магазин</a></li>
          <li className="navbar-item"><a href="#">Дискография</a></li>
          <li className="navbar-item"><a href="https://www.youtube.com/pantera">Видео</a></li>
          <li className="navbar-item"><a href="#">Туры</a></li>
          <li className="navbar-item dropdown" onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <a href="#">Участники &#8964;</a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li className="dropdown-item"><a href="#">Dimebag Darrell</a></li>
                <li className="dropdown-item"><a href="#">Philip H Anselmo</a></li>
                <li className="dropdown-item"><a href="#">Rex Brown</a></li>
                <li className="dropdown-item"><a href="#">Vinnie Paul</a></li>
              </ul>
            )}
          </li>
          {user ? (
            <li className="navbar-item profile-icon" onClick={onProfileClick}>
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
    );
  };
  
  export default Navbar;