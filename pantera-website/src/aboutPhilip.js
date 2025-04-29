import React from 'react';
import './aboutMembers.css';

const AboutPhilip = () => {
    return (
        <div className='member-container-wrapper'>
            <div className='member-container'>
                {/* Заголовок с изображением и названием */}
                <div className='member-title'>
                    <span></span>
                    <h3>Phil Anselmo</h3>
                    <span></span>
                </div>

                {/* Изображение артиста */}
                <div className='member-image'>
                    <img src='/philAnselmo.jpg' alt='Phil Anselmo' />
                </div>

                {/* Информация об артисте */}
                <div className='member-info'>
                    <h4>Общая информация</h4>
                    <ul className='member-details'>
                        <li><strong>Полное имя:</strong> Филипп Ханс Ансельмо (Philip Hansen Anselmo)</li>
                        <li><strong>Дата рождения:</strong> 30 июня 1968 года</li>
                        <li><strong>Роль в группе:</strong> Вокалист, сооснователь группы Pantera</li>
                        <li><strong>Место рождения:</strong> Новый Орлеан, Луизиана, США</li>
                    </ul>
                </div>

                {/* Биография */}
                <div className='member-info'>
                    <h4>Биография</h4>
                    <p>
                        Фил Ансельмо — вокалист, чья энергия и харизма на сцене сделали его одной из самых ярких фигур в мире метал-музыки. Он был фронтменом группы **Pantera**, с которой они прославились по всему миру благодаря своим альбомам, таким как **"Cowboys from Hell"** и **"Far Beyond Driven"**.
                    </p>
                    <p>
                        Помимо Pantera, Фил также был участником других проектов, таких как **Down** и **Superjoint Ritual**, где его вокальный стиль продолжал эволюционировать.
                    </p>
                </div>

                {/* Цитаты */}
                <div className='quotes'>
                    <h4>Цитаты</h4>
                    <blockquote>
                        “Жизнь — это борьба, и я всегда буду бороться, пока не устану.” — Phil Anselmo
                    </blockquote>
                    <blockquote>
                        “Я не боюсь выражать себя. Я не боюсь быть собой.” — Phil Anselmo
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default AboutPhilip;
