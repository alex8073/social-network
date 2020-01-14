import React from 'react';
import styles from "./Users.module.css";
import userPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import {follow, unfollow} from "../../api/api";

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div className={styles.wrapper}>
        <div>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p ? styles.selectedPage + ' ' + styles.pages : styles.pages}
                    onClick={(e) => {
                        props.onPageChanged(p)
                    }}>{p}</span>
            })}
        </div>
        {props.users.map(u => <div key={u.id} className={styles.innerWrapper}>
            <div className={styles.caption}>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""
                             className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {u.followed ? <button onClick={() => {

                            unfollow(u.id).then(data => {
                                if (data.resultCode === 0) {
                                    props.unfollow(u.id);
                                }
                            });

                        }}>Unfollow</button>
                        : <button onClick={() => {

                            follow(u.id).then(data => {
                                if (data.resultCode === 0) {
                                    props.follow(u.id);
                                }
                            });

                        }}>Follow</button>}
                </div>
            </div>
            <div className={styles.description}>
                <div>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </div>
                <div>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </div>
            </div>
        </div>)}
    </div>
};

export default Users;