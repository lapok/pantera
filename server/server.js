const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const commentsRoutes = require('./routes/comments');
const advertsRoutes = require('./routes/advertsMain');
const toursRoutes = require('./routes/tours.js');

app.use('/api', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/adverts', advertsRoutes);
app.use('/api/tours', toursRoutes);


require('dotenv').config();

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});