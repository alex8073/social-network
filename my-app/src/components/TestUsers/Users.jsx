import React from 'react';
import styles from './Users.module.css';

const Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Dmitry_Nagiev_2017_4.jpg/274px-Dmitry_Nagiev_2017_4.jpg',
                followed: false,
                fullName: 'Alex',
                status: 'boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://vokrug.tv/pic/person/9/d/5/0/9d5005ea3a93da03696c0c3194be3b8a.jpg',
                followed: true,
                fullName: 'Ivan',
                status: 'boss',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: 3,
                photoUrl: 'https://vokrug.tv/pic/person/6/2/d/c/62dc840fdbc7016571d8bd2031a1215b.jpg',
                followed: false,
                fullName: 'Elena',
                status: 'boss',
                location: {city: 'Kiev', country: 'Ukraine'}
            }
        ]);
    }

    return (
        <div className={styles.wrapper}>
            {props.users.map(u => <div key={u.id} className={styles.innerWrapper}>
                <div className={styles.caption}>
                    <div>
                        <img src={u.photoUrl} alt="" className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </div>
                <div className={styles.description}>
                    <div>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </div>
                    <div>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </div>
                </div>
            </div>)}
        </div>
    )
};

export default Users;
