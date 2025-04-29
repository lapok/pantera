const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tours WHERE event_date > NOW() - INTERVAL \'2 days\' ORDER BY event_date');
        res.json(result.rows);
    } catch (err) {
        res.status(500).send('Error fetching tours');
    }
});

router.post('/', async (req, res) => {
    const { event_date, venue, city, country, title } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO tours (event_date, venue, city, country, title) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [event_date, venue, city, country, title]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Error adding tour');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { event_date, venue, city, country, title } = req.body;
    try {
        const result = await db.query(
            'UPDATE tours SET event_date = $1, venue = $2, city = $3, country = $4, title = $5 WHERE id = $6 RETURNING *',
            [event_date, venue, city, country, title, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Error updating tour');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tours WHERE id = $1', [id]);
        res.status(200).send('Tour deleted');
    } catch (err) {
        res.status(500).send('Error deleting tour');
    }
});

module.exports = router;