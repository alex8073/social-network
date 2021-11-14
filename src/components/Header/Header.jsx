import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.header_inner_wrapper}>
                <div className={styles.logo_wrapper}>
                    <NavLink to="/"><img className={styles.logo} src="https://senticode.by/img/SenticodeLogo.svg" alt="logo" /></NavLink>
                </div>
                <nav className={styles.navbar}>
                    <ul className={styles.navbar_list}>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/profile">Профиль</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/dialogs">Dialogs</NavLink></li>
                        <li className={styles.navbar_list_item}><NavLink className={styles.navbar_list_item_link} activeClassName={styles.active} to="/users">Users</NavLink></li>
                    </ul>
                </nav>
                <div className={styles.loginBlock}>
                    {props.isAuth
                        ? <div>{props.login}<button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>}

                </div>

            </div>
        </header>
    )
}

export default Header;
