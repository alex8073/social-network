import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.header_inner_wrapper}>
                <div className={styles.logo_wrapper}>
                    <NavLink to="/"><img className={styles.logo} src='https://senticode.by/img/logo_v2.png' alt="logo"></img></NavLink>
                </div>
                <nav className={styles.navbar}>
                    <ul className={styles.navbar_list}>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/aboutus">О нас</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/technologies">Технологии</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/learning">Обучение</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/contacts">Контакты</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/profile">Профиль</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/testdialogs">TestDialogs</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/testusers">TestUsers</NavLink></li>
                    </ul>
                </nav>
                <div className={styles.loginBlock}>
                    {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}

                </div>

            </div>
        </header>
    )
}

export default Header;