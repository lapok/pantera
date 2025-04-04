import React, { useState } from 'react';
import './main-window.css';

const CreatePostModal = ({ isOpen, onClose, onPostCreated, postToEdit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        if (!token) return alert('Нет авторизации');
    
        const method = postToEdit ? 'PUT' : 'POST';
        const url = postToEdit
            ? `http://localhost:5000/api/news/posts/${postToEdit.id}`
            : 'http://localhost:5000/api/news/create';
    
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    image_url: imageUrl,
                }),
            });
    
            if (!res.ok) throw new Error('Ошибка при создании/редактировании поста');
    
            const newPost = await res.json();
    
            onPostCreated(newPost);
            onClose();
        } catch (err) {
            console.error(err);
            alert('Не удалось сохранить пост');
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
        <div className="modal">
          <h2>{postToEdit ? 'Редактировать пост' : 'Создание поста'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Текст поста"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Ссылка на изображение (необязательно)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button type="submit">{postToEdit ? 'Сохранить изменения' : 'Опубликовать'}</button>
          </form>
          <button className="close-button" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
};

export default CreatePostModal;