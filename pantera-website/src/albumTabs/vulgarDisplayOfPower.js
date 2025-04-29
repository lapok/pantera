import React from 'react';


const VdpPage = () => {
    return (
    <div className='album-container-wrapper'>
      <div className='album-container'>
        <div className='album-title'>
          <span></span>
          <h3>VULGAR DISPLAY OF POWER 1992</h3>
          <span></span>
        </div>
        <img className='album-image' src='/cell2.jpg'/>
        <div className="album-info">
          <ul className="album-details">
            <li>- Лейбл: Atco</li>
            <li>- Дата выхода: 25/02/92</li>
            <li>- Золотая сертификация: 09/02/93</li>
            <li>- Платиновая сертификация: 07/11/97</li>
            <li>- Все песни написаны и аранжированы Pantera</li>
            <li>- Все тексты @ 1991 Power Metal Music/COTA Music, BMI</li>
            <li>- Произведено, сведено и смикшировано Терри Дейтом и Винни Полом</li>
            <li>- Сопродюсировано Pantera</li>
            <li>- Записано и смикшировано в Pantego Sound Studio, Pantego, Texas</li>
            <li>- Мастеринг выполнен Хауи Вайнбергом в Mastedisk, NYC</li>
            <li>- Координация A&R: Derek Oliver</li>
            <li>- Фото на обложке: Brad Guice</li>
            <li>- Band Photography: Joe Giron</li>
            <li>- Худ. Директор: Bob Defrin</li>
            <li>- Дизайн: Larry Freemantle</li>
          </ul>

          <div className="quotes">
            <p><strong>Филлип Ансельмо о VULGAR DISPLAY OF POWER (Guitar World 1992):</strong></p>
            <blockquote>
                «Vulgar Display of Power — это не просто альбом. Это наша жизнь, наша агрессия и наши эмоции, выложенные на пластинку. Мы не пытаемся угодить кому-то, мы делаем музыку для себя и для тех, кто нас понимает._»​
            </blockquote>

            <p><strong>Винни Полл о VULGAR DISPLAY OF POWER (Metal Hammer 1992):</strong></p>
            <blockquote>
                «С Vulgar Display of Power мы хотели показать миру, что Pantera — это не просто группа, а сила, способная разрушать стены. Мы вложили в этот альбом всё, что у нас было.»
            </blockquote>
          </div>
        </div>

        <div className='album-title second'>
          <span></span>
          <h3>VULGAR DISPLAY OF POWER 1992</h3>
          <span></span>
        </div>

        {/* Вставка iframe с Яндекс Музыкой */}
        <iframe 
            frameborder="0" 
            allow="clipboard-write" 
            style={{border: 'none;', width:'400px;', height:'600px;'}}
            width="400" 
            height="600" 
            src="https://music.yandex.ru/iframe/album/465218"
            className='album-widget'
        >
            Слушайте <a href="https://music.yandex.ru/album/465218">Vulgar Display of Power</a>— <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке
        </iframe>

        
      </div>
    </div>
    )
}

export default VdpPage;