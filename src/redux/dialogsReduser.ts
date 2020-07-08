const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Вася'},
        {id: 2, name: 'Петя'},
        {id: 3, name: 'Дима'},
        {id: 4, name: 'Вера'},
        {id: 5, name: 'Валя'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Замечательно'},
        {id: 2, message: 'Здорово'},
        {id: 3, message: 'Отлично'},
    ] as Array<MessageType>
};

export type InitialStateType = typeof initialState

const dialogsReduser = (state = initialState, action: any): InitialStateType => {
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

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReduser;