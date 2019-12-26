const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';

const testDialogsReduser = (state, action) => {
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