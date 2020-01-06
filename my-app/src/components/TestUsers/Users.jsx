import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/user.png';

const Users = (props) => {

    let getUsers = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items);
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            <button onClick={getUsers}>Get Users</button>
            {props.users.map(u => <div key={u.id} className={styles.innerWrapper}>
                <div className={styles.caption}>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""
                             className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
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
    )
};

export default Users;
