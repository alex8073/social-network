import React from "react";
import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import { UsersSearchForm } from "./UsersSearchForm";
import { FilterType } from "../../redux/users-reducer";

type PropsType = {
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (pageNumber: number) => void;
    onFilterChanged: (filter: FilterType) => void;
    users: Array<UserType>;
    followingInProgress: Array<number>;
    unfollow: (userId: number) => void;
    follow: (userId: number) => void;
};

const Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, onFilterChanged, ...props }) => {
    return (
        <div className={styles.wrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize} />
            <div className={styles.innerWrapper}>
                {users.map((u) => (
                    <User
                        user={u}
                        key={u.id}
                        // className={styles.innerWrapper}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                    />
                ))}
            </div>
        </div>
    );
};

export default Users;
