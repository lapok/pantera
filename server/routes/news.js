const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('./auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Создание нового поста
router.post('/create', authMiddleware, upload.array('images'), async (req, res) => {
    const { title, content } = req.body;

    // Формируем список URL изображений
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    try {
        // Вставляем новый пост в базу данных
        const result = await db.query(
            'INSERT INTO posts (title, content, image_url, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
            [title, content, JSON.stringify(imageUrls)]  // Сохраняем пути к изображениям как JSON
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка создания поста'});
    }
});

// Получение всех постов
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка загрузки постов'});
    }
});

// Получение поста по ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Пост не найден'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка загрузки поста'});
    }
});

// Удаление поста
router.delete('/posts/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    
    try {
        const postCheck = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        
        if (postCheck.rows.length === 0) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        // Удаление комментариев
        await db.query('DELETE FROM comments WHERE post_id = $1', [id]);

        const deleteResult = await db.query('DELETE FROM posts WHERE id = $1 RETURNING id', [id]);

        if (deleteResult.rows.length === 0) {
            throw new Error('Пост не был удален');
        }
        
        res.status(200).json({ message: 'Пост удален', id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка удаления поста', error: err.message });
    }
});

// Удаление изображения
router.delete('/delete-image', async (req, res) => {
    const { imageUrl, postId } = req.body;

    // Исправляем путь к файлу: предполагаем, что imageUrl уже включает '/uploads/'
    const filePath = path.join(__dirname, '../uploads', imageUrl.replace('/uploads/', ''));

    try {
        // Удаляем файл из папки
        fs.unlinkSync(filePath);

        // Обновляем ссылку на изображение в базе данных
        const post = await db.query('SELECT * FROM posts WHERE id = $1', [postId]);
        
        if (post.rows.length === 0) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        // Фильтруем массив изображений и удаляем ссылку на удаленное изображение
        const updatedImages = JSON.parse(post.rows[0].image_url).filter(url => url !== imageUrl);

        // Обновляем пост в базе данных
        await db.query('UPDATE posts SET image_url = $1 WHERE id = $2', [JSON.stringify(updatedImages), postId]);

        res.status(200).json({ message: 'Изображение успешно удалено' });
    } catch (err) {
        console.error('Ошибка при удалении изображения:', err);
        res.status(500).json({ message: 'Не удалось удалить изображение', error: err.message });
    }
});


// Изменения для маршрута редактирования поста в routes файле
router.put('/posts/:id', authMiddleware, upload.array('images'), async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const existingImages = req.body.existingImages || [];
    
    try {
        // Проверяем существование пост
        const postCheck = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        
        if (postCheck.rows.length === 0) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        // Получаем текущие изображения поста
        let currentImages = [];
        try {
            currentImages = JSON.parse(postCheck.rows[0].image_url || '[]');
        } catch (err) {
            console.error('Ошибка при парсинге существующих изображений:', err);
            currentImages = [];
        }
        
        // Пути к новым загруженным изображениям
        const newImageUrls = req.files.map(file => `/uploads/${file.filename}`);
        
        // Если existingImages передан как массив строк, используем его
        // В противном случае, если передан как строка, парсим JSON
        let imagesArray = [];
        if (Array.isArray(existingImages)) {
            imagesArray = existingImages;
        } else if (typeof existingImages === 'string') {
            try {
                imagesArray = [existingImages]; // Одно изображение как строка
            } catch (e) {
                console.error('Ошибка при парсинге existingImages:', e);
                imagesArray = [];
            }
        }
        
        // Объединяем существующие и новые изображения
        const allImages = [...imagesArray, ...newImageUrls];

        // Обновляем пост в базе данных
        const updateResult = await db.query(
            `UPDATE posts 
             SET title = $1, 
                 content = $2, 
                 image_url = $3,
                 updated_at = NOW()
             WHERE id = $4 
             RETURNING *`,
            [title, content, JSON.stringify(allImages), id]
        );
        
        if (updateResult.rows.length === 0) {
            throw new Error('Пост не был обновлен');
        }

        res.status(200).json(updateResult.rows[0]);

    } catch (err) {
        console.error('Ошибка при обновлении поста:', err);
        res.status(500).json({ message: 'Ошибка редактирования поста', error: err.message });
    }
});







module.exports = router;
