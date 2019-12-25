const UPDATE_NEW_REVIEW_BODY = 'UPDATE-NEW-REVIEW-BODY';
const ADD_REVIEW = 'ADD-REVIEW';

const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';



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
        if (action.type === UPDATE_NEW_REVIEW_BODY) {
            this._state.reviewsPage.newReviewBody = action.body;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_REVIEW) {
            let newReview = {
                id: 4,
                message: this._state.reviewsPage.newReviewBody
            };
            this._state.reviewsPage.reviews.push(newReview);
            this._state.reviewsPage.newReviewBody = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.testDialogsPage.newMessageText = action.newText;
            this._callSubscriber(this._state);
        }  else if (action.type === SEND_MESSAGE) {
            let newText = this._state.testDialogsPage.newMessageText;
            this._state.testDialogsPage.messages.push({ id: 4, message: newText });
            this._state.testDialogsPage.newMessageText = '';
            this._callSubscriber(this._state);
        }
    }

}
export const updateNewReviewBodyCreator = (body) =>
    ({ type: UPDATE_NEW_REVIEW_BODY, body: body });

    export const addReviewCreator = () => ({ type: ADD_REVIEW });


    export const updateNewMessageTextCreator = (newText) =>
        ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: newText });

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });

export default store;
window.store = store;

