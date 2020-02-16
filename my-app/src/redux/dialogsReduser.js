const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
    ]
};

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {id: state.messages.length + 1, message: action.newMessageBody}],
            };
        }
        default:
            return state;
    }
};

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReduser;