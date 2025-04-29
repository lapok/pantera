import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddNewsForm from './AddNewsForm';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = ({ handleNewsAdded }) => {
  const [showAddNewsForm, setShowAddNewsForm] = useState(false);
  const [news, setNews] = useState([]);
  const [user, setUser] = useState(null); // Состояние для пользователя

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/adverts');
        if (!response.ok) throw new Error('Ошибка при загрузке новостей');
        const data = await response.json();
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          console.error('Полученные данные не являются массивом:', data);
        }
      } catch (err) {
        console.error('Ошибка при загрузке новостей:', err);
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; // Если нет токена, выходим

      try {
        const res = await fetch('http://localhost:5000/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Ошибка при загрузке профиля');
        const data = await res.json();
        setUser(data); // Сохраняем данные пользователя в состоянии
      } catch (err) {
        console.error('Ошибка при загрузке пользователя:', err);
        localStorage.removeItem('token'); // Убираем токен, если ошибка
      }
    };

    fetchLatestNews();
    fetchUser();
  }, []);


  return (
    <footer className='footer-main'>
      <div className='footer-section about'>
        <h2>О нас</h2>
        <p>
          Создатели "Power Groove", Pantera стали флагманами хэви-метала в 90-е годы, собрав длинный список золотых и платиновых альбомов, а также гастроли по всему миру.
        </p>
      </div>

      <div className='footer-section news'>
        <h2>Последние новости</h2>
        <ul>
          {news.map((item, index) => (
            <li key={index} className="news-item">
              <div className="news-date">
                <span className="day">{new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit' })}</span>
                <span className="month">{new Date(item.created_at).toLocaleDateString('en-GB', { month: 'short' })}</span>
              </div>
              <div className="news-content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </li>
          ))}
        </ul>

        {user?.role === 'admin' && (
          <button onClick={() => setShowAddNewsForm(true)}>Добавить новость</button>
        )}
        {showAddNewsForm && <AddNewsForm onClose={() => setShowAddNewsForm(false)} onNewsAdded={handleNewsAdded} />}
      </div>

      <div className='footer-section more-info'>
        <h2>Больше новостей/Информация</h2>
        <ul>
          <li><NavLink to="/news" className={({ isActive }) => isActive ? 'active-nav' : ''}>Pantera</NavLink></li>
          <li><a href='/dimebagdarrell'>Dimebag Darrell</a></li>
          <li><a href='philiphanselmo'>Philip H Anselmo</a></li>
          <li><a href='rexbrown'>Rex Brown</a></li>
          <li><a href='vinniepaul'>Vinnie Paul</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
