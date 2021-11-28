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
import { useHistory } from "react-router";

type PropsType = {};

export const Users: React.FC<PropsType> = () => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = new URLSearchParams(history.location.search);
        const page = parsed.get("page");
        const term = parsed.get("term");
        const friend = parsed.get("friend");

        const actualPage = page === null ? 1 : Number(page);
        const actualFilter = {
            ...filter,
            term: term === null ? "" : term,
            friend: friend === "true" ? true : friend === "false" ? false : null,
        };
        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        history.push({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
        });
    }, [filter, currentPage]);

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
            <div>
                <h6>Общее число пользователей:</h6>
                <span>{totalUsersCount}</span>
            </div>
        </div>
    );
};
