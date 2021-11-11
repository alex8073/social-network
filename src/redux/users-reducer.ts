import { ResultCodeEnum } from "../api/api";
import { updateObjectInArray } from "../utils/objects-helper";
import { UserType } from "../types/types";
import { Dispatch } from "redux";
import { BaseThunkType, InferActionsType } from "./redux-store";
import { usersAPI } from "../api/users-api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids
};

type InitialStateType = typeof initialState;

const UsersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
            };
        case "SN/USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
            };
        case "SN/USERS/SET_USERS":
            return { ...state, users: action.users };
        case "SN/USERS/SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage };
        case "SN/USERS/SET_TOTAL_USERS_COUNT":
            return { ...state, totalUsersCount: action.count };
        case "SN/USERS/TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching };
        case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter((id) => id !== action.userId)],
            };
        default:
            return state;
    }
};

type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    followSuccess: (userId: number) => ({ type: "SN/USERS/FOLLOW", userId } as const),
    unfollowSuccess: (userId: number) => ({ type: "SN/USERS/UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SN/USERS/SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SN/USERS/SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SN/USERS/SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "SN/USERS/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
};

type ThunkType = BaseThunkType<ActionsType>;

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsType>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsType
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = actions.followSuccess;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    };
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = actions.unfollowSuccess;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    };
};

export default UsersReducer;
