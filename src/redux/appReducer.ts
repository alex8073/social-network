import {getAuthUserData} from './authReducer';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

type ActionsType = InitializedSuccessType;

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS //'INITIALIZED_SUCCESS'
}

export const initializedSuccess = (): InitializedSuccessType => ({type: INITIALIZED_SUCCESS});

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
};

export default appReducer;