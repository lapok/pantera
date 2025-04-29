import React from 'react';
import './aboutMembers.css';

const AboutDimebag = () => {
    return (
        <div className='member-container-wrapper'>
            <div className='member-container'>
                {/* Заголовок с изображением и названием */}
                <div className='member-title'>
                    <span></span>
                    <h3>Dimebag Darrell</h3>
                    <span></span>
                </div>

                {/* Изображение артиста */}
                <div className='member-image'>
                    <img src='/dimebagDarrell.jpg'/>
                </div>

                {/* Информация об артисте */}
                <div className='member-info'>
                    <h4>Общая информация</h4>
                    <ul className='member-details'>
                        <li><strong>Полное имя:</strong> Даррелл Лэнс Абботт (Darrell Lance Abbott)</li>
                        <li><strong>Дата рождения:</strong> 20 августа 1966 года</li>
                        <li><strong>Дата смерти:</strong> 8 декабря 2004 года</li>
                        <li><strong>Роль в группе:</strong> Гитарист, сооснователь группы Pantera</li>
                        <li><strong>Место рождения:</strong> Арлингтон, Техас, США</li>
                    </ul>
                </div>

                {/* Биография */}
                <div className='member-info'>
                    <h4>Биография</h4>
                    <p>
                        Даймбэг Даррелл (настоящее имя Даррелл Лэнс Абботт) был одним из самых влиятельных гитаристов в мире метал-музыки. С раннего возраста он проявил интерес к музыке, и в 1981 году вместе со своим братом Винни Полом основал группу **Pantera**. Группа сразу же стала популярной благодаря уникальному звучанию, которое сочетало элементы хард-рока, трэша и панка.
                    </p>
                    <p>
                        В своём гитарном стиле Даррелл использовал инновационные приёмы, которые оставили неизгладимый след в мире музыки. Его фирменный звук и мастерство вдохновили целые поколения гитаристов. С альбомами, такими как **"Cowboys from Hell"** и **"Vulgar Display of Power"**, Pantera стала одной из самых популярных и культовых групп в метал-среде.
                    </p>
                    <p>
                        После распада Pantera, Даррелл создал новый проект **Damageplan**, но его карьера трагически прервалась, когда он был убит во время концерта в 2004 году.
                    </p>
                </div>

                {/* Цитаты */}
                <div className='quotes'>
                    <h4>Цитаты</h4>
                    <blockquote>
                        “Я не играю на гитаре, потому что хочу стать знаменитым, я играю, потому что это то, что я умею делать лучше всего.” — Dimebag Darrell
                    </blockquote>
                    <blockquote>
                        “Как только я перестану получать удовольствие от игры, я брошу играть на гитаре.” — Dimebag Darrell
                    </blockquote>
                    <blockquote>
                        “Чем больше я играю, тем лучше становлюсь.” — Dimebag Darrell
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

export default AboutDimebag;
