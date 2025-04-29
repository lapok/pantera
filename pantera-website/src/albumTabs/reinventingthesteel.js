import React from 'react';

const RtsPage = () => {
    return (
        <div className='album-container-wrapper'>
        <div className='album-container'>
          <div className='album-title'>
            <span></span>
            <h3>REINVENTING THE STEEL</h3>
            <span></span>
          </div>
          <img className='album-image' src='/cell6.jpg'/>
          <div className="album-info">
            <ul className="album-details">
                <li>- Лейбл: Elektra</li>
                <li>- Дата выпуска: 21.03.00</li>
                <li>- Золотая сертификация: 02.05.00</li>
                <li>- Все песни написаны и аранжированы Pantera</li>
                <li>- Продюсеры: Винни Пол и Даймбэг Даррелл</li>
                <li>- Со-продюсер: Стерлинг Уинфилд</li>
                <li>- Запись в DWG, Техас, в студии Chasin Jason Studios</li>
                <li>- Инженеры: Винни Пол и Стерлинг Уинфилд</li>
                <li>- Мастеринг: Хауи Вайнберг в Masterdisk</li>
                <li>- Цифровое редактирование и секвенирование: Роджер Лиан</li>
                <li>- Керри Кинг исполнил гитарное соло на Goddam Electric и появится с любезного разрешения Columbia Records</li>
            </ul>
  
            <div className="quotes">
              <p><strong>Филлип Анесльмо о Reinventing the Steel в интервью для Loudwire, посвящённом 24-летию альбома:</strong></p>
              <blockquote>
                «На Reinventing the Steel я почувствовал новый огонь под собой. Мы с Даймом стали гораздо ближе, потому что я больше не был постоянно в отключке. Это был первый альбом без Тери Дейта, и чувствовался свежий воздух и настоящее братство».
              </blockquote>
  
              <p><strong>Даймбэг Даррелл о Reinventing the Steel в интервью для Guitar World:</strong></p>
              <blockquote>
                «Pantera делает смелое заявление, называя этот альбом Reinventing the Steel. Каждый наш релиз — это смелое заявление. Люди говорят: „Вы, ребята с Юга, много болтаете“. Да, но мы подтверждаем это делом, и мы даже не на полпути к тому, куда идём».
              </blockquote>
            </div>
          </div>
  
          <div className='album-title second'>
            <span></span>
            <h3>REINVENTING THE STEEL</h3>
            <span></span>
          </div>
  
          {/* Вставка iframe с Яндекс Музыкой */}
            <iframe 
                frameborder="0" 
                allow="clipboard-write" 
                style={{border:'none;', width:'400px;', height:'600px;'}} 
                width="400" 
                height="600" 
                src="https://music.yandex.ru/iframe/album/12585388"
                className='album-widget'
            >
                Слушайте <a href="https://music.yandex.ru/album/12585388">Reinventing the Steel</a> — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке</iframe>
  
        </div>
      </div>
    )
}

export default RtsPage;