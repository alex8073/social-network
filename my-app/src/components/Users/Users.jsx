import React from 'react';
import styles from "./Users.module.css";
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div className={styles.wrapper}>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount} pageSize={pageSize}/>
        {users.map(u => <User user={u}
                              key={u.id}
                              className={styles.innerWrapper}
                              followingInProgress={props.followingInProgress}
                              unfollow={props.unfollow}
                              follow={props.follow}/>
        )
        }
    </div>
};

export default Users;