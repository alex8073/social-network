import { ResultCodeEnum } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";
import { profileAPI } from "../api/profile-api";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        { id: 1, message: "первое сообщение" },
        { id: 2, message: "второе сообщение" },
        { id: 3, message: "третье сообщение" },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, { id: state.posts.length + 1, message: action.newPostText }],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.postId),
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,
            };
        default:
            return state;
    }
};

type ActionsType = AddPostCreatorActionType | SetUserProfileActionType | SetUserStatusActionType | DeletePostActionType | SavePhotoSuccessActionType;

type AddPostCreatorActionType = {
    type: typeof ADD_POST;
    newPostText: string;
};
export const addPostCreator = (newPostText: string): AddPostCreatorActionType => ({ type: ADD_POST, newPostText });

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS;
    status: string;
};
export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status });

type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
};
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS;
    photos: PhotosType;
};

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUserProfile =
    (userId: number): ThunkType =>
    async (dispatch) => {
        const res = await profileAPI.getUserProfile(userId);
        dispatch(setUserProfile(res));
    };

export const getUserStatus =
    (userId: number): ThunkType =>
    async (dispatch) => {
        const res = await profileAPI.getUserStatus(userId);
        dispatch(setUserStatus(res));
    };

export const updateStatus =
    (status: string): ThunkType =>
    async (dispatch) => {
        try {
            const res = await profileAPI.updateStatus(status);
            if (res.resultCode === ResultCodeEnum.Success) {
                dispatch(setUserStatus(status));
            }
        } catch (error) {}
    };

export const savePhoto =
    (file: any): ThunkType =>
    async (dispatch) => {
        const res = await profileAPI.savePhoto(file);
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(savePhotoSuccess(res.data.photos));
        }
    };

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const res = await profileAPI.saveProfile(profile);
    if (res.resultCode === ResultCodeEnum.Success) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: res.messages[0] }));
        return Promise.reject(res.messages[0]);
    }
};

export default profileReducer;
