import React, { useEffect, useState } from 'react';
import './tourPage.css';

const Tours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingTour, setEditingTour] = useState(null);
    const [user, setUser] = useState(null); // Состояние для текущего пользователя
    const [isAdmin, setIsAdmin] = useState(false); // Флаг для проверки, является ли пользователь администратором

    // Получаем туры с бэкенда
    const fetchTours = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/tours');
            const data = await res.json();

            // Сортировка туров по дате (от ближайшей к дальнейшей)
            data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

            setTours(data);
            setLoading(false);
        } catch (err) {
            setError('Ошибка загрузки туров');
            setLoading(false);
        }
    };

    // Получаем данные о пользователе
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
            if (data.role === 'admin') {
                setIsAdmin(true); // Если пользователь администратор, устанавливаем флаг
            }
        } catch (err) {
            console.error('Ошибка при загрузке пользователя:', err);
            localStorage.removeItem('token');
        }
    };

    // Функции для CRUD операций
    const handleAddTour = async (tour) => {
        const res = await fetch('http://localhost:5000/api/tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tour),
        });
        const newTour = await res.json();
        setTours([...tours, newTour]);
    };

    const handleEditTour = async (tour) => {
        const res = await fetch(`http://localhost:5000/api/tours/${tour.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tour),
        });
        const updatedTour = await res.json();
        setTours(tours.map((t) => (t.id === updatedTour.id ? updatedTour : t)));
    };

    const handleDeleteTour = async (id) => {
        await fetch(`http://localhost:5000/api/tours/${id}`, { method: 'DELETE' });
        setTours(tours.filter((tour) => tour.id !== id));
    };

    const openModal = (tour = null) => {
        setEditingTour(tour);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTour(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newTour = {
            event_date: form.event_date.value,
            venue: form.venue.value,
            city: form.city.value,
            country: form.country.value,
            title: form.title.value,
        };
        if (editingTour) {
            handleEditTour({ ...editingTour, ...newTour });
        } else {
            handleAddTour(newTour);
        }
        closeModal();
    };

    useEffect(() => {
        fetchTours();
        fetchUser(); // Загружаем данные о пользователе
    }, []);

    return (
        <div className='tour-container-wrapper'>
            <div className='tour-container'>
                <div className='tour-title'>
                    <span></span>
                    <h3>Туры</h3>
                    <span></span>
                </div>
                <div className='tour-table'>
                    {isAdmin && (
                        <button onClick={() => openModal()} className='add-tour-btn'>Добавить тур</button>
                    )}
                    {loading && <p>Загрузка...</p>}
                    {error && <p>{error}</p>}
                    {tours.length === 0 && !loading && <p>Туры не найдены</p>}
                    {tours.map((tour) => (
                        <div key={tour.id} className='tour-item'>
                            <div className='tour-info'>
                                <h4 className='tour-title'>{tour.venue}</h4>
                                <p className='tour-location'>{tour.title}, {tour.city}, {tour.country}</p>
                                <p className='tour-date'>{new Date(tour.event_date).toLocaleDateString()}</p>
                            </div>
                            {isAdmin && (
                                <div className='tour-actions'>
                                    <button onClick={() => openModal(tour)}>Редактировать</button>
                                    <button onClick={() => handleDeleteTour(tour.id)}>Удалить</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Модальное окно */}
            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h3>{editingTour ? 'Редактировать тур' : 'Добавить тур'}</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='date'
                                name='event_date'
                                defaultValue={editingTour ? new Date(editingTour.event_date).toISOString().slice(0, 10) : ''}
                                required
                            />
                            <input
                                type='text'
                                name='venue'
                                placeholder='Место проведения'
                                defaultValue={editingTour ? editingTour.venue : ''}
                                required
                            />
                            <input
                                type='text'
                                name='city'
                                placeholder='Город'
                                defaultValue={editingTour ? editingTour.city : ''}
                                required
                            />
                            <input
                                type='text'
                                name='country'
                                placeholder='Страна'
                                defaultValue={editingTour ? editingTour.country : ''}
                                required
                            />
                            <input
                                type='text'
                                name='title'
                                placeholder='Название'
                                defaultValue={editingTour ? editingTour.title : ''}
                                required
                            />
                            <div className='modal-buttons'>
                                <button type='submit'>{editingTour ? 'Сохранить' : 'Добавить'}</button>
                                <button type='button' onClick={closeModal}>Закрыть</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tours;
