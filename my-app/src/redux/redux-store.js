import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import testDialogsReduser from "./testDialogsReduser";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    profilePage: profileReducer,
    testDialogsPage: testDialogsReduser,
    usersPage: usersReducer,
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;