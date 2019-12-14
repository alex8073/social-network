import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


let reviewsData = [
    { id: 1, name: 'Вася' },
    { id: 2, name: 'Петя' },
    { id: 3, name: 'Дима' },
    { id: 4, name: 'Вера' },
    { id: 5, name: 'Валя' },
]

let messagesData = [
    { id: 1, message: 'Замечательно' },
    { id: 2, message: 'Здорово' },
    { id: 3, message: 'Отлично' },
]

ReactDOM.render(<App reviewsData={reviewsData} messagesData={messagesData}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
