const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Папка для сохранения изображений
const uploadDir = path.join(__dirname, '..', 'uploads');

// Если папка не существует, создаем её
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });  // добавлен флаг recursive
}

// Настройка хранения изображений с уникальными именами файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Указываем папку для сохранения
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 189);  // Генерация уникального имени файла
        cb(null, uniqueSuffix + path.extname(file.originalname));  // Сохранение с уникальным именем и расширением
    }
});

// Экспортируем объект upload для использования в роутерах
const upload = multer({ storage });

module.exports = upload;
