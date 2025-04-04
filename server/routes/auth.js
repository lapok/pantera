const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    try {
        const userCheck = await db.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(409).json({ message: 'Логин или email уже заняты' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (username, email, password, role, about, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
            [username, email, hashedPassword, 'user', '']
        );

        res.status(201).json({ message: 'Регистрация успешна' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Введите логин и пароль' });
    }
  
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
  
      const user = result.rows[0];
      if (!user) return res.status(401).json({ message: 'Пользователь не найден' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Неверный пароль' });

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          created_at: user.created_at,
          about: user.about
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ошибка авторизации' });
    }
  });  

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, username, role, created_at, about FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка получения профиля' });
    }
});

router.put('/me/about', authMiddleware, async (req, res) => {
    const { about } = req.body;

    try {
        await db.query('UPDATE users SET about = $1 WHERE id = $2', [about, req.user.id]);
        res.json({ message: 'Информация обновлена' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка обновления профиля' });
    }
});

module.exports = router;
