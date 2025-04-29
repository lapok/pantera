import React from 'react';
import './aboutMembers.css';

const AboutVinnie = () => {
    return (
        <div className='member-container-wrapper'>
            <div className='member-container'>
                {/* Заголовок с изображением и названием */}
                <div className='member-title'>
                    <span></span>
                    <h3>Vinnie Paul</h3>
                    <span></span>
                </div>

                {/* Изображение артиста */}
                <div className='member-image'>
                    <img src='/vinniePaul.jpg' alt='Vinnie Paul' />
                </div>

                {/* Информация об артисте */}
                <div className='member-info'>
                    <h4>Общая информация</h4>
                    <ul className='member-details'>
                        <li><strong>Полное имя:</strong> Винсент Пол Абботт (Vincent Paul Abbott)</li>
                        <li><strong>Дата рождения:</strong> 11 марта 1964 года</li>
                        <li><strong>Дата смерти:</strong> 22 июня 2018 года</li>
                        <li><strong>Роль в группе:</strong> Барабанщик, сооснователь группы Pantera</li>
                        <li><strong>Место рождения:</strong> Арлингтон, Техас, США</li>
                    </ul>
                </div>

                {/* Биография */}
                <div className='member-info'>
                    <h4>Биография</h4>
                    <p>
                        Винни Пол (настоящее имя Винсент Пол Абботт) был барабанщиком и сооснователем группы **Pantera**. Он был известен своей агрессивной и мощной игрой на барабанах, которая стала одним из знаков отличия группы. После распада Pantera, Винни продолжил свою карьеру с новым проектом **Hellyeah**, который также получил признание в метал-среде.
                    </p>
                    <p>
                        Винни Пол оказал огромнейшее влияние на развитие хард-рока и металла, благодаря своему уникальному стилю игры на барабанах. Его вклад в группу Pantera стал основой для их звучания.
                    </p>
                </div>

                {/* Цитаты */}
                <div className='quotes'>
                    <h4>Цитаты</h4>
                    <blockquote>
                        “Металл — это не просто музыка. Это образ жизни.” — Vinnie Paul
                    </blockquote>
                    <blockquote>
                        “Я играю на барабанах, потому что мне нравится быть на сцене.” — Vinnie Paul
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default AboutVinnie;
