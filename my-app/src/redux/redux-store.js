import {combineReducers, createStore} from "redux";
import reviewsReducer from "./reviewsReducer";
import testDialogsReduser from "./testDialogsReduser";

let reducers = combineReducers({
    reviewsPage: reviewsReducer,
    testDialogsPage: testDialogsReduser
});

let store = createStore(reducers);

export default store;