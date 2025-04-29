import React from 'react';

const FbdPage = () => {
    return (
        <div className='album-container-wrapper'>
      <div className='album-container'>
        <div className='album-title'>
          <span></span>
          <h3>FAR BEYOND DRIVEN 1994</h3>
          <span></span>
        </div>
        <img className='album-image' src='/cell3.jpg'/>
        <div className="album-info">
          <ul className="album-details">
            <li>- Лейбл: East West</li>
            <li>- Дата выхода: 22/03/94</li>
            <li>- Золотая сертификация: 09/05/94</li>
            <li>- Платиновая сертификация: 07/11/97</li>
            <li>- Все песни написаны и аранжированы Pantera (кроме Planet Caravan в исполнении Black Sabbath)</li>
            <li>- Все песни @ 1993 Cota Music, BMI, adm by Warner-Tamerlane Music (кроме Planet Caravan)</li>
            <li>- Производство, инжиниринг и микширование Терри Дэйт и Винни Пол</li>
            <li>- Со-продюсирование Pantera</li>
            <li>- A&R координация Дерека Оливера</li>
            <li>- Запись в Нэшвилле, TN</li>
            <li>- Микширование в Dallas Sound Labs, Dallas, TX</li>
            <li>- Ассистенты микшировщика: Тим Кимси, Стерлинг Уинфилд</li>
            <li>- Мастеринг Теда Дженсена в Sterling Sound, NYC</li>
          </ul>

          <div className="quotes">
            <p><strong>Даррел о Far Beyond Driven (Guitar World Feb 1998):</strong></p>
            <blockquote>
              “Песни пришли легко, и я думаю, что это определенно один из самых брутальных альбомов Pantera. Он безостановочный. Он попал в чарты Billboard под номером 1, уничтожил Ace of Base и кучу другой музыки. Представьте себе хэви-метал группу, попавшую на #1 в Billboard. Для нас это был пипец!”
            </blockquote>

            <p><strong>Винни Пол о Far Beyond Driven (Vanyaland 2014):</strong></p>
            <blockquote>
                "Единственное давление, которое мы испытывали, это давление, которое мы оказывали на себя. Мы не позволяли какому-либо давлению со стороны звукозаписывающей компании или чему-то подобному влиять на нас. Мы хотели сделать самый экстремальный альбом, который только могли; мы придумали название Far Beyond Diven еще до того, как написали одну песню для него, и это как бы задало тон всей пластинке."
            </blockquote>
          </div>
        </div>

        <div className='album-title second'>
          <span></span>
          <h3>FAR BEYOND DRIVEN 1994</h3>
          <span></span>
        </div>

        {/* Вставка iframe с Яндекс Музыкой */}
        <iframe 
            frameborder="0" 
            allow="clipboard-write" 
            style={{border:'none;', width:'400px;', height:'600px;'}} 
            width="400" 
            height="600" 
            src="https://music.yandex.ru/iframe/album/1892403"
            className='album-widget'    
        >
                Слушайте <a href="https://music.yandex.ru/album/1892403">Far Beyond Driven</a>
                 — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке
        </iframe>

      </div>
    </div>
    )
}

export default FbdPage;