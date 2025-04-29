import React from 'react';

const DODPage = () => {
    return (
        <div className='album-container-wrapper'>
      <div className='album-container'>
        <div className='album-title'>
          <span></span>
          <h3>A DECADE OF DOMINATION</h3>
          <span></span>
        </div>
        <img className='album-image' src='/cell9.jpg'/>
        <div className="album-info">
          <ul className="album-details">
            <li><p>Содержание сборника: </p></li>
            <li>1. Cowboys From Hell </li>
            <li>2. Cemetery Gates</li>
            <li>3. Mouth For War</li>
            <li>4. Walk</li>
            <li>5. This love</li>
            <li>6. I'm Broken</li>
            <li>7. Becoming</li>
            <li>8. 5 Minutes Alone</li>
            <li>9. Planet Caravan</li>
            <li>10. Drag The Waters</li>
            <li>11. Where You Come From (Live)</li>
            <li>12. Cat Scratch Fever</li>
            <li>13. Revolution Is My Name</li>
            <li>14. I'll Cast A Shadow</li>
            <li>15. Goddamn Electric</li>
            <li>16. Hole In the Sky</li>
          </ul>

          <div className="quotes">
            <p><strong>— AllMusic, рецензия на альбом:</strong></p>
            <blockquote>
            «Этот сборник — отличное введение в творчество Pantera, особенно для тех, кто не знаком с их музыкой. Он включает в себя наиболее знаковые треки, такие как 'Cowboys from Hell' и 'Walk', которые демонстрируют силу и агрессию группы».
            </blockquote>

            <p><strong>— Пользователь Metal Storm, отзыв о альбоме:</strong></p>
            <blockquote>
            «Хотя Far Beyond the Great Southern Cowboys' Vulgar Hits! и является сборником, он отлично передает суть Pantera. Это не просто подборка хитов, а настоящий взгляд на их музыкальное наследие».
            </blockquote>
          </div>
        </div>

        <div className='album-title second'>
          <span></span>
          <h3>A DECADE OF DOMINATION</h3>
          <span></span>
        </div>

        {/* Вставка iframe с Яндекс Музыкой */}
        <iframe 
            frameborder="0" 
            allow="clipboard-write" 
            style={{border:'none;', width:'400px;', height:'600px;'}}
            width="400" 
            height="600" 
            src="https://music.yandex.ru/iframe/album/59057"
            className='album-widget'
        >
            Слушайте <a href="https://music.yandex.ru/album/59057">1990-2000: A Decade Of Domination</a> — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке</iframe>

        
      </div>
    </div>
    )
}

export default DODPage;