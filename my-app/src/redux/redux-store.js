import {combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import testDialogsReduser from "./testDialogsReduser";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    testDialogsPage: testDialogsReduser,
    usersPage: usersReducer
});

let store = createStore(reducers);

window.store = store;

export default store;