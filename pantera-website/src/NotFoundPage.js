import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div 
            style={{
                textAlign:'center', 
                marginTop: '250px', 
                marginBottom:'100px', 
                fontSize:'35px',
                fontFamily:'Arial'
            }}
        >
            <h1 style={{color:'white'}}>404 - Страница не найдена</h1>
            <p style={{color:'white'}}>Кажется вы попали на несуществующую страницу!</p>
            <Link to='/' style={{textDecoration:'none', color:'red'}}>Нажми на меня, чтобы вернуться на главную страницу, либо на логотип сверху!</Link>
        </div>
    );
};

export default NotFoundPage;