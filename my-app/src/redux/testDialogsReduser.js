const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const testDialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;
        case SEND_MESSAGE:
            let newText = state.newMessageText;
            state.messages.push({ id: 4, message: newText });
            state.newMessageText = '';
            return state;
        default:
            return state;
    }
}

export const updateNewMessageTextCreator = (newText) =>
        ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: newText });

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });

export default testDialogsReduser;