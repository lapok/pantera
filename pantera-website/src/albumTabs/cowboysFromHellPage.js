import React from 'react';
import './albumTabs.css';

const CfhPage = () => {
  
  return (
    <div className='album-container-wrapper'>
      <div className='album-container'>
        <div className='album-title'>
          <span></span>
          <h3>COWBOYS FROM HELL 1990</h3>
          <span></span>
        </div>
        <img className='album-image' src='/cell1.jpg'/>
        <div className="album-info">
          <ul className="album-details">
            <li>- Выпущено: 24/07/90</li>
            <li>- Label: Elektra</li>
            <li>- Золотая сертификация: 14/09/93</li>
            <li>- Платиновая сертификация: 16/07/97</li>
            <li>- Все песни написаны и аранжированы Pantera</li>
            <li>- Все песни опубликованы Power Metal Music/Cota Music, BMI</li>
            <li>- Администрация Warner Tamerlane Music Publishing</li>
            <li>- Производство и инжиниринг by Terry Date</li>
            <li>- Сопродюсирование Pantera</li>
            <li>- Запись: Pantego Sound Studio, Pantego, Texas</li>
            <li>- Микс: Pantera and Terry Date at The Carriage House, Stamford, CT</li>
            <li>- Ассистент менеджера: Matt Lane</li>
            <li>- A&R: Mark Ross</li>
            <li>- Освоено Howie Weinberg at Masterdisk, New York City</li>
            <li>- Худ. директор: Bob Defrin</li>
            <li>- Фото с концертов: Joe Giron</li>
            <li>- Фоновая фотография на обложке: Bettman Archive</li>
            <li>- Все тексты © 1990 Power Metal Music/Cota</li>
          </ul>

          <div className="quotes">
            <p><strong>Даррел о Cowboys From Hell (Guitar World 02/98):</strong></p>
            <blockquote>
              “Я бы сказал, что это было чертовски невероятное событие, которое произошло с нами. Мы наконец-то заключили контракт с крупным лейблом. Я знал, что мы нашли свой стиль, и я знал, что мы нашли свое направление и то, кем мы являемся. Это заняло у нас много времени, но я рад, что это не произошло раньше.”
            </blockquote>

            <p><strong>Рекс о Cowboys From Hell (Guitar World 7/24):</strong></p>
            <blockquote>
              «Винни накладывал все барабаны, затем Дайм играл на гитаре. Бас мы ставили в последнюю очередь. Мы выключали все каналы ударных, и я просто играл вместе с треком Дайма. Это стало известно как "микроскоп”. Если что-то было не так, мы брали бритвенный станок и резали и склеивали пленку. Тогда у нас еще не было профессиональных инструментов. И именно это создало наш фирменный звук, где гитара и бас просто идеально совпадают. Однажды Дайм пришел с магнитофонной петлей, на которой он снова и снова играл в высоком регистре. Это сводило нас с ума, потому что он не переставал её играть. Это и стало "Cowboys from Hell", и это было началом пауэр-грува, которого придерживаются все группы сегодня».
            </blockquote>
          </div>
        </div>

        <div className='album-title second'>
          <span></span>
          <h3>COWBOYS FROM HELL 1990</h3>
          <span></span>
        </div>

        {/* Вставка iframe с Яндекс Музыкой */}

        <iframe
          frameBorder="0"
          allow="clipboard-write"
          style={{ border: 'none', width: '400px', height: '600px' }}
          width="400"
          height="600"
          src="https://music.yandex.ru/iframe/album/154321"
          className='album-widget'
        >
          Слушайте <a href="https://music.yandex.ru/album/154321">Cowboys From Hell</a> — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке
        </iframe>
      </div>
    </div>
  );
};

export default CfhPage;

