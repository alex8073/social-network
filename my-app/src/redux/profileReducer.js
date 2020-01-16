import {usersAPI} from "../api/api";

const UPDATE_NEW_POST_BODY = 'UPDATE_NEW_POST_BODY';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    reviews: [
        {id: 1, message: 'первое сообщение'},
        {id: 2, message: 'второе сообщение'},
        {id: 3, message: 'третье сообщение'}
    ],
    newReviewBody: '',
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_POST_BODY:
            return {
                ...state,
                newReviewBody: action.body
            };
        case ADD_POST:
            return {
                ...state,
                newReviewBody: '',
                reviews: [...state.reviews, {id: 4, message: state.newReviewBody}],

            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        default:
            return state;
    }
};

export const updateNewReviewBodyCreator = (body) =>
    ({type: UPDATE_NEW_POST_BODY, body: body});

export const addReviewCreator = () => ({type: ADD_POST});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getUserProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        });
    }
}


export default profileReducer;