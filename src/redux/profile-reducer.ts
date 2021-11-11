import { ResultCodeEnum } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsType } from "./redux-store";
import { profileAPI } from "../api/profile-api";

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
        case "SN/PROFILE/ADD_POST":
            return {
                ...state,
                posts: [...state.posts, { id: state.posts.length + 1, message: action.newPostText }],
            };
        case "SN/PROFILE/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile,
            };
        case "SN/PROFILE/SET_USER_STATUS":
            return {
                ...state,
                status: action.status,
            };
        case "SN/PROFILE/DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter((p) => p.id !== action.postId),
            };
        case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,
            };
        default:
            return state;
    }
};

type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    addPostCreator: (newPostText: string) => ({ type: "SN/PROFILE/ADD_POST", newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: "SN/PROFILE/SET_USER_PROFILE", profile } as const),
    setUserStatus: (status: string) => ({ type: "SN/PROFILE/SET_USER_STATUS", status } as const),
    deletePost: (postId: number) => ({ type: "SN/PROFILE/DELETE_POST", postId } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: "SN/PROFILE/SAVE_PHOTO_SUCCESS", photos } as const),
};

type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const getUserProfile =
    (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.getUserProfile(userId);
        dispatch(actions.setUserProfile(data));
    };

export const getUserStatus =
    (userId: number): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.getUserStatus(userId);
        dispatch(actions.setUserStatus(data));
    };

export const updateStatus =
    (status: string): ThunkType =>
    async (dispatch) => {
        try {
            const data = await profileAPI.updateStatus(status);
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setUserStatus(status));
            }
        } catch (error) {}
    };

export const savePhoto =
    (file: File): ThunkType =>
    async (dispatch) => {
        const data = await profileAPI.savePhoto(file);
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    };

export const saveProfile =
    (profile: ProfileType): ThunkType =>
    async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile);
        if (data.resultCode === ResultCodeEnum.Success) {
            if (userId !== null) {
                dispatch(getUserProfile(userId));
            } else {
                throw new Error("UserId can`t be null.");
            }
        } else {
            dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
            return Promise.reject(data.messages[0]);
        }
    };

export default profileReducer;
