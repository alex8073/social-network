import React, { useEffect } from "react";
import styles from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UsersSearchForm } from "./UsersSearchForm";
import { FilterType, follow as f, requestUsers, unfollow as u } from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter,
} from "../../redux/users-selectors";

type PropsType = {};

export const Users: React.FC<PropsType> = () => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    };
    const follow = (userId: number) => {
        dispatch(f(userId));
    };
    const unfollow = (userId: number) => {
        dispatch(u(userId));
    };

    return (
        <div className={styles.wrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            <div className={styles.innerWrapper}>
                {users.map((u) => (
                    <User
                        user={u}
                        key={u.id}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}
                    />
                ))}
            </div>
        </div>
    );
};
