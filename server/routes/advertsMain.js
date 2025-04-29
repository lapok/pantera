const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('./auth');

router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        // Логируем параметры, которые передаются в запрос
        console.log('Title:', title);
        console.log('Content:', content);

        const result = await db.query(
            'INSERT INTO home_news (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        
        console.log('New News Added:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Ошибка при добавлении новости', err);
        res.status(500).json({ message: 'Ошибка добавления новости' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM home_news ORDER BY created_at DESC LIMIT 2');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching news:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

module.exports = router;