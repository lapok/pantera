const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
    const { post_id, content } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Пользователь не авторизован'});
    }
    const userId = req.user.id;

    try {
        const result = await db.query(
            'INSERT INTO comments (post_id, content, user_id) VALUES ($1, $2, $3) RETURNING *',
            [post_id, content, userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при добавлении комментария' });
    }
});

router.get('/:post_id', async (req, res) => {
    const { post_id } = req.params;

    try {
        const result = await db.query(
            `SELECT comments.*, users.username, users.role  -- добавляем users.role
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE post_id = $1
            ORDER BY comments.created_at ASC`,
            [post_id]
        );
        res.json(result.rows);  // теперь в каждом комментарии будет также роль
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка загрузки комментариев' });
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        const result = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
        const comment = result.rows[0];

        if (!comment) return res.status(404).json({ message: 'Комментарий не найден'});

        if (comment.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Нет прав'});
        }

        await db.query('DELETE FROM comments WHERE id = $1', [id]);
        res.json({ message: 'Удалено'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка удаления комментари'});
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    try {
        const result = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
        const comment = result.rows[0];

        if (!comment) return res.status(404).json({ message: 'Комментарий не найден'});

        if (comment.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Нет прав на редактирование'});
        }

        const updateResult = await db.query(
            'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
            [content, id]
        );

        res.json(updateResult.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при редактировании комментария'});
    }
});

module.exports = router;
