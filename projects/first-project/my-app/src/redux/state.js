const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const UPDATE_NEW_POST_BODY = 'UPDATE-NEW-POST-BODY';
const ADD_POST = 'ADD-POST';


let store = {
    _state: {
        reviewsPage: {
            reviewsData: [
                { id: 1, name: 'Вася' },
                { id: 2, name: 'Петя' },
                { id: 3, name: 'Дима' },
                { id: 4, name: 'Вера' },
                { id: 5, name: 'Валя' },
            ],
            messagesData: [
                { id: 1, message: 'Замечательно' },
                { id: 2, message: 'Здорово' },
                { id: 3, message: 'Отлично' },
            ],
            newMessageText: 'Senticode.by'
        },
        testPagePage: {
            posts: [
                { id: 1, message: 'первое сообщение' },
                { id: 2, message: 'второе сообщение' },
                { id: 3, message: 'третье сообщение' }
            ],
            newPostBody: ''
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
        if (action.type === ADD_MESSAGE) {
            let newMessage = {
                id: 4,
                message: this._state.reviewsPage.newMessageText
            };
            this._state.reviewsPage.messagesData.push(newMessage);
            this._state.reviewsPage.newMessageText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.reviewsPage.newMessageText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_BODY) {
            this._state.testPagePage.newPostBody = action.body;
            this._callSubscriber(this._state);
        } else if (action.type === ADD_POST) {
            let body = this._state.testPagePage.newPostBody;
            this._state.testPagePage.posts.push({ id: 4, message: body });
            this._state.testPagePage.newPostBody = '';
            this._callSubscriber(this._state);
        }
    }

}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });


export const addPostCreator = () => ({ type: ADD_POST });

export const updateNewPostBodyCreator = (body) =>
    ({ type: UPDATE_NEW_POST_BODY, body: body });







export default store;
window.store = store;

