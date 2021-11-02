import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let store = {
    _state: {
        reviewsPage: {
            posts: [
                {id: 1, message: 'первое сообщение'},
                {id: 2, message: 'второе сообщение'},
                {id: 3, message: 'третье сообщение'}
            ],
            newPostBody: ''
        },
        DialogsPage: {
            dialogs: [
                {id: 1, name: 'Вася'},
                {id: 2, name: 'Петя'},
                {id: 3, name: 'Дима'},
                {id: 4, name: 'Вера'},
                {id: 5, name: 'Валя'},
            ],
            messages: [
                {id: 1, message: 'Замечательно'},
                {id: 2, message: 'Здорово'},
                {id: 3, message: 'Отлично'},
            ],
            newMessageText: 'Senticode.by'
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.reviewsPage = profileReducer(this._state.reviewsPage, action);
        this._state.DialogsPage = dialogsReducer(this._state.DialogsPage, action);
        this._callSubscriber(this._state);
    }

};

export default store;

window.store = store;

