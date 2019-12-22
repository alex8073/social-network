import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header_inner_wrapper}>
                <div className={classes.logo_wrapper}>
                    <NavLink to="/welcome"><img className={classes.logo} src='https://senticode.by/img/logo_v2.png' alt="logo"></img></NavLink>
                </div>
                <nav className={classes.navbar}>
                    <ul className={classes.navbar_list}>
                        <li className={classes.navbar_list_item}><NavLink className={classes.navbar_list_item_link} activeClassName={classes.active} to="/aboutus">О нас</NavLink></li>
                        <li className={classes.navbar_list_item}><NavLink className={classes.navbar_list_item_link} activeClassName={classes.active} to="/technologies">Технологии</NavLink></li>
                        <li className={classes.navbar_list_item}><NavLink className={classes.navbar_list_item_link} activeClassName={classes.active} to="/learning">Обучение</NavLink></li>
                        <li className={classes.navbar_list_item}><NavLink className={classes.navbar_list_item_link} activeClassName={classes.active} to="/contacts">Контакты</NavLink></li>
                        <li className={classes.navbar_list_item}><NavLink className={classes.navbar_list_item_link} activeClassName={classes.active} to="/reviews">Отзывы</NavLink></li>
                        <li className={classes.navbar_list_item}><NavLink className={classes.navbar_list_item_link} activeClassName={classes.active} to="/testpage">TestPage</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;