import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import store from './redux/store';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import StoreContext, {Provider} from "./StoreContext";

// let rerenderEntireTree = (state) => {
let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            {/*<StoreContext.Provider value={store}>*/}
                {/*<App state={state} dispatch={store.dispatch.bind(store)} store={store} />*/}
                <App />
            {/*</StoreContext.Provider>*/}
            </Provider>
        </BrowserRouter>, document.getElementById('root'));
}

// rerenderEntireTree(store.getState());
rerenderEntireTree();

// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });
store.subscribe(() => {
    rerenderEntireTree();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
