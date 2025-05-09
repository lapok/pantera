import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './main-window.css';
import AuthModal from './AuthModal';
import UserProfileModal from './userProfileModal';
import Navbar from './NavBar';


const MainWindow = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [user, setUser] = useState(null);
    const [news, setNews] = useState([]);
    const [viewUser, setViewUser] = useState(null);

    const handleNewsAdded = (newNews) => {
        setNews((prevNews) => [newNews, ...prevNews.slice(0, 1)]);
    };

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

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const slides = [
        { image: '/carousel-1.jpg', buttonText: 'Даты туров', link: '/tours' },
        { image: '/carousel-2.jpg', buttonText: 'Графический роман "VULGAR DISPLAY OF POWER" от Z2 COMICS', link: 'https://z2comics.com/collections/pantera' },
        { image: '/carousel-3.png', buttonText: 'Фото с выступлений, новости и объявления', link: '/news' },
    ];

    const handleButtonClick = (link) => {
        if (link.startsWith('http')) {
            window.open(link, '_blank');
        } else {
            window.location.href = link;
        }
    };

    const preventDragHandler = (e) => {
        e.preventDefault();
        return false;
    }

    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 40,
        height: 40,
        cursor: 'pointer',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        border: 'none',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
    };

    const renderArrowPrev = (onClickHandler, hasPrev, label) =>
        hasPrev && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, left: 15 }}
                className="carousel-button prev"
            >
                &lt;
            </button>
        );

    const renderArrowNext = (onClickHandler, hasNext, label) =>
        hasNext && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: 15 }}
                className="carousel-button next"
            >
                &gt;
            </button>
        );
    
    const renderIndicator = (onClickHandler, isSelected, index, label) => {
        return (
            <li
                className={`carousel-indicator ${isSelected ? 'active' : ''}`}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
                style={{
                    width: '12px',
                    height: '12px',
                    background: isSelected ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    margin: '0 8px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    cursor: 'pointer'
                }}
            />
        );
    };

    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    return (
        <>
            <div className='carousel-container'>
                <Carousel
                    showArrows={true}
                    showThumbs={false}
                    transitionTime={300}
                    dynamicHeight={false}
                    infiniteLoop={true}
                    showStatus={false}
                    renderArrowPrev={renderArrowPrev}
                    renderArrowNext={renderArrowNext}
                    renderIndicator={renderIndicator}
                    useKeyboardArrows={true}
                    swipeable={true}
                    emulateTouch={true}
                    preventMovementUntilSwipeScrollTolerance={true}
                    swipeScrollTolerance={50}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="carousel-slide">
                            <img 
                                src={slide.image} 
                                alt={`Slide ${index + 1}`} 
                                style={{ 
                                    width: '100%', 
                                    height: '100vh', 
                                    objectFit: 'cover',
                                    userSelect: 'none',
                                    pointerEvents: 'none'
                                }}
                                draggable="false"
                                onDragStart={preventDragHandler}
                            />
                            <button
                                className='carousel-button center'
                                onClick={() => handleButtonClick(slide.link)}
                                style={{
                                    userSelect: 'none',
                                    cursor: 'pointer',
                                    zIndex: 20
                                }}
                            >
                                {slide.buttonText}
                            </button>
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className='image-grid'>
                <div className='grid-item' style={{ backgroundImage: "url('/grid-1.jpg')" }}>
                    <a href='/discography'>МУЗЫКА</a>
                </div>

                <div className='grid-item' style={{ backgroundImage: "url('/grid-2.jpg')" }}>
                    <a href='https://www.youtube.com/pantera'>ВИДЕО</a>
                </div>

                <div className='grid-item' style={{ backgroundImage: "url('/grid-3.jpg')" }}>
                    <a href='https://panterastore.com/'>МАГАЗИН</a>
                </div>
            </div>

            

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSwitch={() => setIsRegisterMode((prev) => !prev)}
                isRegisterMode={isRegisterMode}
                onLoginSuccess={fetchUser}
            />

            <UserProfileModal
                isOpen={showProfile}
                onClose={() => {
                    setViewUser(null);
                    setShowProfile(false);
                }}
                user={user}
                onLogout={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}
                viewUser={viewUser}
            />
        </>
    );
};

export default MainWindow;