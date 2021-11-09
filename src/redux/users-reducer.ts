import { ResultCodeEnum, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/objects-helper";
import { UserType } from "../types/types";
import { Dispatch } from "redux";
import { AppStateType, InferActionsType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

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
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true }),
            };
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false }),
            };
        case "SET_USERS":
            return { ...state, users: action.users };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.currentPage };
        case "SET_TOTAL_USERS_COUNT":
            return { ...state, totalUsersCount: action.count };
        case "TOGGLE_IS_FETCHING":
            return { ...state, isFetching: action.isFetching };
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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
    followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
    unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "SET_CURRENT_PAGE", currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
};

type DispatchType = Dispatch<ActionsType>;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

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

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
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
