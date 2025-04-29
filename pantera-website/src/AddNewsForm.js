import React, { useState } from 'react';

const AddNewsForm = ({ onClose, onNewsAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return alert('Необходимо авторизироваться');
    
        try {
            const response = await fetch('http://localhost:5000/api/adverts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });
    
            if (!response.ok) {
                console.error('Ошибка при добавлении новости:', response);
                throw new Error('Ошибка при добавлении новости');
            }
    
            const newNews = await response.json();
            onNewsAdded(newNews);
            onClose();
        } catch (err) {
            console.error('Ошибка при отправке данных:', err);
            alert('Не удалось добавить новость');
        }
    };
    

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Добавить новость</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Заголовок'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder='Текст новости'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type='submit'>Добавить</button>
                </form>
                <button className='close-button' onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default AddNewsForm;
