import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionsType } from "./redux-store";

let initialState = {
    initialized: false,
};

type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

type ActionsType = InferActionsType<typeof actions>;

const actions = {
    initializedSuccess: () => ({ type: "SN/APP/INITIALIZED_SUCCESS" } as const),
};

type ThunkType = BaseThunkType<ActionsType, void>;

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default appReducer;
