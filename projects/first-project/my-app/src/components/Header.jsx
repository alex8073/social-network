import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="header-inner-wrapper">
                <div className="logo">
                    <img src='https://senticode.by/img/logo.png'></img>
                </div>
                <nav className="navbar">
                    <ul className="navbar_list">
                        <li className="navbar_list_item"><a className="navbar_list_item_link" href="#">О нас</a></li>
                        <li className="navbar_list_item"><a className="navbar_list_item_link" href="#">Технологии</a></li>
                        <li className="navbar_list_item"><a className="navbar_list_item_link" href="#">Обучение</a></li>
                        <li className="navbar_list_item"><a className="navbar_list_item_link" href="#">Контакты</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;