import React from 'react';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header_inner_wrapper}>
                <div className={classes.logo_wrapper}>
                <a href="/welcome"><img className={classes.logo} src='https://senticode.by/img/logo_v2.png' alt="logo"></img></a> 
                </div>
                <nav className={classes.navbar}>
                    <ul className={classes.navbar_list}>
                        <li className={classes.navbar_list_item}><a className={classes.navbar_list_item_link} href="/aboutus">О нас</a></li>
                        <li className={classes.navbar_list_item}><a className={classes.navbar_list_item_link} href="/technologies">Технологии</a></li>
                        <li className={classes.navbar_list_item}><a className={`${classes.navbar_list_item_link} ${classes.active}`} href="/learning">Обучение</a></li>
                        <li className={classes.navbar_list_item}><a className={classes.navbar_list_item_link} href="/contacts">Контакты</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;