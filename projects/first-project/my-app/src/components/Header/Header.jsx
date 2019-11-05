import React from 'react';
import classes from './Header.module.css';

console.log(classes);

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header_inner_wrapper}>
                <div className={classes.logo_wrapper}>
                    <img className={classes.logo} src='https://senticode.by/img/logo_v2.png' alt="logo"></img>
                </div>
                <nav className={classes.navbar}>
                    <ul className={classes.navbar_list}>
                        <li className={classes.navbar_list_item}><a className={classes.navbar_list_item_link} href="#">О нас</a></li>
                        <li className={classes.navbar_list_item}><a className={classes.navbar_list_item_link} href="#">Технологии</a></li>
                        <li className={classes.navbar_list_item}><a className={`${classes.navbar_list_item_link} ${classes.active}`} href="#">Обучение</a></li>
                        <li className={classes.navbar_list_item}><a className={classes.navbar_list_item_link} href="#">Контакты</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;