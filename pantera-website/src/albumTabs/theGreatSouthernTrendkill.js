import React from 'react';

const GstPage = () => {
    return (
        <div className='album-container-wrapper'>
        <div className='album-container'>
          <div className='album-title'>
            <span></span>
            <h3>THE GREAT SOUTHERN TREND KILL 1996</h3>
            <span></span>
          </div>
          <img className='album-image' src='/cell4.jpg'/>
          <div className="album-info">
            <ul className="album-details">
                <li>- Лейбл: East West</li>
                <li>- Дата релиза: 07/05/96</li>
                <li>- Золотая сертификация: 25/6/04</li>
                <li>- Платиновая сертификация: 17/08/04</li>
                <li>- Производство, запись и микширование Терри Дэйт и Винни Пол</li>
                <li>- Сопродюсирование Pantera</li>
                <li>- Также записано Ульрихом Уайлдом</li>
                <li>- Запись проходила в ДРГ, Техал в Chasin Jason Studios</li>
                <li>- Ассистенты студии: Sterling Winfield, Aaron Barnes</li>
                <li>- Микширование в Лос-Анджелесе в Larrabee Sound Studios</li>
                <li>- Ассистент микс-инженера: Lamont Hyde</li>
                <li>- Вокал записан в Nothing Studios, Новый Орлеан, Луизиана</li>
                <li>- Освоено Tom Baker в Future Disc & Ted Jensen в Sterling Sound</li>
                <li>- Бэк вокал Dimebag, Rex, и Vinnie</li>
                <li>- Seth Putnam исполняет дополнительные вопли на TGSTK, War Nerve, Suicide Note Pt. 2</li>
                <li>- Big Ross: клавишные на Suicide Note Pt. 1 и Living Through Me (Hell's Wrath)</li>
                <li>- Арти-дирекция и дизайн альбома: "Wild" Jim deBarros</li>
                <li>- Помощь в оформлении: David Manteau </li>
                <li>- Фотоиллюстрации: Exum</li>
                <li>- Фото обложки любезно предоставлено Зигом Лещински</li>
            </ul>
  
            <div className="quotes">
              <p><strong>Филлип Анесльмо о The Great Southern Trendkill (Интервью на радио "Do You Know Jack?" 2016):</strong></p>
              <blockquote>
                “Это было очень интересное время, но и очень сложное. Лично мне не особо везло, потому что я был травмирован, и делал все возможные ошибки новичка с обезболивающими и всем таким. Мне было стыдно. Я не хотел никого видеть, был в плохом состоянии. Тем не менее, я присутствовал на протяжении всего процесса написания песен, потому что я являюсь автором текстов. Поэтому они нуждались во мне для того, чтобы привести песни к какому-то порядку, к структуре. Но я решил записывать свои вокалы в студии Трента Резнора, которая была здесь, в Новом Орлеане, и это было потрясающе.”
              </blockquote>
  
              <p><strong>Винни Пол о The Great Southern Trendkill (Интервью для The Rock Father 1996):</strong></p>
              <blockquote>
                  "The Great Southern Trendkill был действительно сумасшедшим альбомом для Pantera. Это был самый хаотичный, самый неорганизованный, самый противоречащий всем нормам альбом, который мы когда-либо записывали. Оглядываясь назад, после того как мы участвовали в ремастеринге, я могу это точно сказать. При этом альбом вышел в 1996 году, когда на сцену выходил рэп-метал, и я даже помню, как нам позвонил президент нашего лейбла и сказал:'Эй, вам нужно... добавьте немного рэпа в ваш альбом, постарайтесь сделать что-то в этом духе.' И мы просто посмеялись и ответили:'Хорошо, мы прямо сейчас этим займемся'. В любом случае, этот альбом был просто гигантским жестом среднего пальца музыкальной индустрии того времени, и я думаю, что он действительно сделал всё, что нужно."
              </blockquote>
            </div>
          </div>
  
          <div className='album-title second'>
            <span></span>
            <h3>THE GREAT SOUTHERN TREND KILL 1996</h3>
            <span></span>
          </div>
  
          {/* Вставка iframe с Яндекс Музыкой */}
            <iframe 
                frameborder="0" 
                allow="clipboard-write" 
                style={{border:"none;", width:"400px;", height:"600px;"}} 
                width="400" 
                height="600" 
                src="https://music.yandex.ru/iframe/album/3847694"
                className='album-widget'
            >
                Слушайте <a href="https://music.yandex.ru/album/3847694">The Great Southern Trendkill</a>
                 — <a href="https://music.yandex.ru/artist/49053">Pantera</a> на Яндекс Музыке</iframe>
  
        </div>
      </div>
    )
}

export default GstPage;