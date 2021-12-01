import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const selectUsers = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(selectUsers, (users) => {
    return users.filter((u) => true);
});

export const selectPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};

export const selectTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const selectCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const selectUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
};

export const selectIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const selectFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};
