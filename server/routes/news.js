const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('./auth');

router.post('/create', authMiddleware, async (req, res) => {
    const { title, content, image_url } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO posts (title, content, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, content, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка создания поста'});
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка загрузки постов'});
    }
});

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

// Route prefix must match client paths (/posts/...)
router.delete('/posts/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    
    try {
        console.log(`Попытка удаления поста с ID: ${id}`);
        console.log(`Пользователь:`, req.user);
        
        const postCheck = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        
        if (postCheck.rows.length === 0) {
            console.log(`Пост с ID ${id} не найден`);
            return res.status(404).json({ message: 'Пост не найден' });
        }
        
        try {
            await db.query('DELETE FROM comments WHERE post_id = $1', [id]);
            console.log(`Комментарии для поста ${id} удалены`);
        } catch (commentErr) {
            console.error('Ошибка при удалении комментариев:', commentErr);
        }
        
        const deleteResult = await db.query('DELETE FROM posts WHERE id = $1 RETURNING id', [id]);
        
        if (deleteResult.rows.length === 0) {
            throw new Error('Пост не был удален по неизвестной причине');
        }
        
        console.log(`Пост с ID ${id} успешно удален`);
        res.status(200).json({ message: 'Пост удален', id });
    } catch (err) {
        console.error('Подробная ошибка при удалении поста:', err);
        res.status(500).json({ message: 'Ошибка удаления поста', error: err.message });
    }
});

router.put('/posts/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    
    try {
        const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        const post = result.rows[0];
        
        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }
        
        if (post.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Нет прав на редактирование' });
        }
        
        const updateResult = await db.query(
            'UPDATE posts SET title = $1, content = $2, image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *',
            [title, content, image_url, id]
        );
        
        res.status(200).json(updateResult.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка редактирования поста' });
    }
});


module.exports = router;