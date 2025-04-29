import React from 'react';

const GHitsPage = () => {
    return (
        <div className='album-container-wrapper'>
        <div className='album-container'>
          <div className='album-title'>
            <span></span>
            <h3>COWBOY'S VULGAR HITS</h3>
            <span></span>
          </div>
          <img className='album-image' src='/cell8.jpg'/>
          <div className="album-info">
            <ul className="album-details">
                <li>- Выпущено: 23/09/2003</li>
                <li>- Записано: 1989 - 2000</li>
                <li>- Длительность: 78:07</li>
                <li>- Лейбл: Elektra, Rhino</li>
                <li>- Компиляция: Ким Дэвис</li>
            </ul>
  
            <div className="quotes">
              <p><strong>— AllMusic, рецензия на альбом :</strong></p>
              <blockquote>
              «Этот сборник — отличное введение в творчество Pantera, особенно для тех, кто не знаком с их музыкой. Он включает в себя наиболее знаковые треки, такие как 'Cowboys from Hell' и 'Walk', которые демонстрируют силу и агрессию группы».
              </blockquote>
  
              <p><strong>— AllMusic, рецензия на издание с бонусным DVD:</strong></p>
              <blockquote>
              «Поскольку сборник представлен в хронологическом порядке, он также является отличным введением для тех, кто ещё не знаком с Cowboys From Hell».
              </blockquote>
            </div>
          </div>
  
          <div className='album-title second'>
            <span></span>
            <h3>COWBOY'S VULGAR HITS</h3>
            <span></span>
          </div>
  
          {/* Вставка iframe с Яндекс Музыкой */}
            <iframe 
                frameborder="0" 
                allow="clipboard-write" 
                style={{border:'none;', width:'400px;', height:'600px;'}}
                width="400" 
                height="600" 
                src="https://music.yandex.ru/iframe/album/18678"
                className='album-widget'
            >
                Слушайте <a href="https://music.yandex.ru/album/18678">The Best of Pantera: Far Beyond the Great Southern Cowboy's Vulgar Hits</a> — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке</iframe>
  
        </div>
      </div>
    )
}

export default GHitsPage;