import {combineReducers, createStore} from "redux";
import reviewsReducer from "./reviewsReducer";
import testDialogsReduser from "./testDialogsReduser";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    reviewsPage: reviewsReducer,
    testDialogsPage: testDialogsReduser,
    usersPage: usersReducer
});

let store = createStore(reducers);

window.store = store;

export default store;