import React, { useState } from 'react';

const AdminPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch ('http://localhost:5000/api/news/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ title, content, image_url: imageUrl}),
            });

            if (response.ok) {
                alert('Пост успешно добавлен');
                setTitle('');
                setContent('');
                setImageUrl('');
            } else {
                alert('Ошибка добавления поста');
            }
        } catch (err) {
            console.error(err);
            alert('Ошибка подключения');
        }
    };

    return (
        <div className='admin-post-form'>
            <h2>Добавить пост</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    placeholder='Заголовок'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    requirer
                />
                <textarea
                    placeholder='Содержимое'
                    value={content}
                    onChange={(e) => setContent(e.targer.value)}
                    required
                />
                <input
                    type='text'
                    placeholder='Ссылка на изображение'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <button type='submit'>Создать пост</button>
            </form>
        </div>
    );
};

export default AdminPostForm;