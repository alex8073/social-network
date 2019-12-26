import reviewsReducer from './reviewsReducer';
import testDialogsReduser from './testDialogsReduser';

let store = {
    _state: {
        reviewsPage: {
            reviews: [
                { id: 1, message: 'первое сообщение' },
                { id: 2, message: 'второе сообщение' },
                { id: 3, message: 'третье сообщение' }
            ],
            newReviewBody: ''
        },
        testDialogsPage: {
            dialogs: [
                { id: 1, name: 'Вася' },
                { id: 2, name: 'Петя' },
                { id: 3, name: 'Дима' },
                { id: 4, name: 'Вера' },
                { id: 5, name: 'Валя' },
            ],
            messages: [
                { id: 1, message: 'Замечательно' },
                { id: 2, message: 'Здорово' },
                { id: 3, message: 'Отлично' },
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
        this._state.reviewsPage = reviewsReducer(this._state.reviewsPage, action);
        this._state.testDialogsPage = testDialogsReduser(this._state.testDialogsPage, action);
        this._callSubscriber(this._state);
    }

}

export default store;
window.store = store;

