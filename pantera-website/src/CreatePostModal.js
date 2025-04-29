import React, { useState, useEffect } from 'react';
import './main-window.css';

const CreatePostModal = ({ isOpen, onClose, onPostCreated, postToEdit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Заполнение формы при открытии модального окна
    useEffect(() => {
        if (isOpen) {
            if (postToEdit) {
                setTitle(postToEdit.title);
                setContent(postToEdit.content);
                setImages(postToEdit.image_url ? JSON.parse(postToEdit.image_url) : []);
                setIsEdit(true);
            } else {
                // Сброс полей, если это новый пост
                setTitle('');
                setContent('');
                setImages([]);
                setIsEdit(false);
            }
        }
    }, [isOpen, postToEdit]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    const removeImage = async (index, e) => {
        e.preventDefault();
        
        const imageUrl = images[index];
        
        // Проверяем, является ли это файлом (новым изображением)
        if (imageUrl instanceof File || imageUrl instanceof Blob) {
            // Если это новый файл, просто удаляем из состояния
            setImages(prevImages => prevImages.filter((_, i) => i !== index));
            return;
        }
        
        // Если это существующее изображение и есть ID поста
        if (postToEdit?.id) {
            const postId = postToEdit.id;
            
            try {
                const response = await fetch('http://localhost:5000/api/news/delete-image', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageUrl, postId }),
                });
        
                if (!response.ok) {
                    throw new Error('Не удалось удалить изображение с сервера');
                }
        
                // Если изображение удалено, обновляем состояние на фронтенде
                setImages(prevImages => prevImages.filter((_, i) => i !== index));
        
            } catch (err) {
                console.error(err);
                alert('Не удалось удалить изображение');
            }
        } else {
            // Если нет ID поста, просто удаляем из состояния
            setImages(prevImages => prevImages.filter((_, i) => i !== index));
        }
    };

    const renderImagePreviews = () => {
        return images.map((image, index) => {
            const isFile = image instanceof File || image instanceof Blob;
    
            return (
                <div key={index} className="image-preview">
                    {isFile ? (
                        <img src={URL.createObjectURL(image)} alt={`preview-${index}`} />
                    ) : (
                        // Для URL-изображений
                        <img src={`http://localhost:5000${image}`} alt={`image-url-${index}`} />
                    )}
                    <button onClick={(e) => removeImage(index, e)}>Удалить</button>
                </div>
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return alert('Нет авторизации');
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
    
        // Добавляем файлы в FormData с разделением на новые и существующие
        images.forEach((image) => {
            if (image instanceof File || image instanceof Blob) {
                // Для новых файлов
                formData.append('images', image);
            } else {
                // Для существующих URL-изображений
                formData.append('existingImages', image);
            }
        });
    
        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit
            ? `http://localhost:5000/api/news/posts/${postToEdit.id}`
            : 'http://localhost:5000/api/news/create';
    
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!res.ok) throw new Error('Ошибка при создании/редактировании поста');
    
            const updatedPost = await res.json();
            
            // Передаем второй параметр, который указывает, является ли это редактированием
            onPostCreated(updatedPost, isEdit);
            
            // Очистка формы и закрытие
            setTitle('');
            setContent('');
            setImages([]);
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
                <h2>{isEdit ? 'Редактировать пост' : 'Создание поста'}</h2>
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
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div className="image-previews">
                        {renderImagePreviews()}
                    </div>
                    <button type="submit">{isEdit ? 'Сохранить изменения' : 'Опубликовать'}</button>
                </form>
                <button className="close-button" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default CreatePostModal;