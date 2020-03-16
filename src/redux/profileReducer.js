import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from 'redux-form';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'первое сообщение'},
        {id: 2, message: 'второе сообщение'},
        {id: 3, message: 'третье сообщение'}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, message: action.newPostText}],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        default:
            return state;
    }
};

export const addPostCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getUserProfile(userId);
    dispatch(setUserProfile(response));
};

export const getUserStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId);
    dispatch(setUserStatus(response));
};

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
};

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response));
    }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.messages[0]}));
        return Promise.reject(response.messages[0]);
    }
};


export default profileReducer;