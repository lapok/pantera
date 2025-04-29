import React, { useState, useEffect } from 'react';
import './main-window.css';

const UserProfileModal = ({ isOpen, onClose, user, onLogout, viewUser }) => { 
    const [editAbout, setEditAbout] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (viewUser) {
            setEditAbout(viewUser.about || '');  // Загружаем информацию о пользователе, если он передан
        }
    }, [viewUser]);

    if (!isOpen || !viewUser) return null;  // Если модальное окно не открыто или нет данных о пользователе

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/me/about', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ about: editAbout }),
            });

            if (res.ok) {
                alert('Информация обновлена!');
                setIsEditing(false);
            } else {
                alert('Ошибка при сохранении');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка подключения');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className='modal-overlay'>
            <div className='modal profile-modal'>
                <h2>Профиль пользователя</h2>
                <div className='user-info'>
                    <div className='avatar-placeholder'>👤</div>
                    <div>
                        <p><strong>{viewUser.username}</strong> <span className='role-label'>[{viewUser.role}]</span></p>
                        <p>Зарегистрирован с: {new Date(viewUser.created_at).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="about-section">
                    <label htmlFor="about">Обо мне:</label>
                    {isEditing ? (
                        <textarea
                            id="about"
                            rows={3}
                            value={editAbout}
                            onChange={(e) => setEditAbout(e.target.value)}
                            placeholder="Напиши что-нибудь о себе..."
                            style={{
                                width: '100%',
                                borderRadius: '8px',
                                padding: '10px',
                                fontSize: '16px',
                                resize: 'none',
                                marginBottom: '10px'
                            }}
                        />
                    ) : (
                        <p>{editAbout || 'Не указано'}</p>
                    )}
                    {user?.id === viewUser?.id ? (
                        <div>
                            {isEditing ? (
                                <button
                                    className="logout-button"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Сохраняю...' : 'Сохранить'}
                                </button>
                            ) : (
                                <button className="logout-button" onClick={() => setIsEditing(true)}>
                                    Редактировать
                                </button>
                            )}
                        </div>
                    ) : null}
                </div>

                {user?.id === viewUser?.id && (
                    <button onClick={onLogout} className='logout-button'>Выйти с аккаунта</button>
                )}
                <button onClick={onClose} className='close-button'>Закрыть</button>
            </div>
        </div>
    );
};

export default UserProfileModal;
