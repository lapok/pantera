import React from 'react';


const OflpPage = () => {
    return (
        <div className='album-container-wrapper'>
        <div className='album-container'>
          <div className='album-title'>
            <span></span>
            <h3>OFFICAL LIVE: 101 PROOF</h3>
            <span></span>
          </div>
          <img className='album-image' src='/cell5.jpg'/>
          <div className="album-info">
            <ul className="album-details">
                <li>- Лейбл: Elektra</li>
                <li>- Дата выхода: 29/07/97</li>
                <li>- Золотая сертификация: 14/05/99</li>
                <li><p>Концертные треки:</p></li>
                <li>- Продюсеры и сведение: Винни Пол и Даймбег Даррелл</li>
                <li>- Ассистент сведения: Стерлинг Уинфилд</li>
                <li>- Запись живого выступления: Аарон Барнс</li>
                <li>- Ассистент: Роберто Друлс</li>
                <li><p>2 Студийных трека:</p></li>
                <li>- Продюсеры и сведение: Винни Пол и Даймбег Даррелл</li>
                <li>- Ассистент: "Рампл" Виндфеллер</li>
                <li>- Звукорежиссёр: Винни Пол</li>
                <li>- Ассистент: Стерлинг Уинфилд</li>
                <li>- Сведение: DWG, TX, студия Chasin' Jason Studios</li>
                <li>- Мастеринг: Тед Дженсен, Sterling Sound</li>
                <li>- Все песни написаны и аранжированы Pantera</li>
                <li>- Арт-директор (Live 101): Джим де Баррос</li>
                <li>- Дизайн: Сара Ротман (MODCo) / Джим Баррос</li>
                <li>- Фотография обложки: Джон Фолс</li>
                <li>- Концертные фото: Джо Жирон</li>
            </ul>
  
            <div className="quotes">
              <p><strong>Филлип Анесльмо о Offical Live: 101 Proof:</strong></p>
              <blockquote>
                «Следующая песня посвящена всем тем, кто никогда не сдавался, кто не поддался слабым трендам и чуждым идеям. Чёрт с ними! Потому что знаете что? Все вместе: ТРЕНД МЕРТВ!»
              </blockquote>
  
              <p><strong>Винни Пол о Offical Live: 101 Proof:</strong></p>
              <blockquote>
                «Мы записали новый материал во время перерыва в нашем туре. Мы записали их за 12 дней. Это было отличное чувство — вернуться в студию. Особенно когда мы знали, что песни попадут на альбом, который так важен для нас и наших фанатов.»
              </blockquote>
            </div>
          </div>
  
          <div className='album-title second'>
            <span></span>
            <h3>OFFICAL LIVE: 101 PROOF</h3>
            <span></span>
          </div>
  
          {/* Вставка iframe с Яндекс Музыкой */}
            <iframe 
                frameborder="0" 
                allow="clipboard-write" 
                style={{border:'none;', width:'400px;', height:'600px;'}} 
                width="400" 
                height="600" 
                src="https://music.yandex.ru/iframe/album/42335"
                className='album-widget'
            >
            Слушайте <a href="https://music.yandex.ru/album/42335">Official Live: 101 Proof</a> — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке</iframe>
  
        </div>
      </div>

    )
}

export default OflpPage;