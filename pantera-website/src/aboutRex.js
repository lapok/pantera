import React from 'react';
import './aboutMembers.css';

const AboutRex = () => {
    return (
        <div className='member-container-wrapper'>
            <div className='member-container'>
                {/* Заголовок с изображением и названием */}
                <div className='member-title'>
                    <span></span>
                    <h3>Rex Brown</h3>
                    <span></span>
                </div>

                {/* Изображение артиста */}
                <div className='member-image'>
                    <img src='/rexBrown.jpg' alt='Rex Brown' />
                </div>

                {/* Информация об артисте */}
                <div className='member-info'>
                    <h4>Общая информация</h4>
                    <ul className='member-details'>
                        <li><strong>Полное имя:</strong> Рекс Роберт Браун (Rex Robert Brown)</li>
                        <li><strong>Дата рождения:</strong> 27 июля 1964 года</li>
                        <li><strong>Роль в группе:</strong> Бас-гитарист, сооснователь группы Pantera</li>
                        <li><strong>Место рождения:</strong> Галвестон, Техас, США</li>
                    </ul>
                </div>

                {/* Биография */}
                <div className='member-info'>
                    <h4>Биография</h4>
                    <p>
                        Рекс Браун был основным басистом группы **Pantera**. Он был не только важным музыкальным элементом группы, но и вдохновляющим музыкантом для многих гитаристов. Рекс был сооснователем Pantera, и его басовые линии стали важной частью звучания группы.
                    </p>
                    <p>
                        После распада Pantera, Рекс продолжил работать над сольной карьерой и был участником других музыкальных проектов.
                    </p>
                </div>

                {/* Цитаты */}
                <div className='quotes'>
                    <h4>Цитаты</h4>
                    <blockquote>
                        “Музыка — это то, что дает мне силы жить и двигаться вперед.” — Rex Brown
                    </blockquote>
                    <blockquote>
                        “Мне нравится быть в тени. Но при этом я знаю, что мой вклад в музыку имеет значение.” — Rex Brown
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default AboutRex;
