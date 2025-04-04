const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const commentsRoutes = require('./routes/comments');

app.use('/api', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentsRoutes);

require('dotenv').config();

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
