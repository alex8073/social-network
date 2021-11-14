import { InferActionsType } from "./redux-store";

type DialogType = {
    id: number;
    name: string;
};

type MessageType = {
    id: number;
    message: string;
};

let initialState = {
    dialogs: [
        { id: 1, name: "Вася" },
        { id: 2, name: "Петя" },
        { id: 3, name: "Дима" },
        { id: 4, name: "Вера" },
        { id: 5, name: "Валя" },
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: "Замечательно" },
        { id: 2, message: "Здорово" },
        { id: 3, message: "Отлично" },
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/DIALOGS/SEND_MESSAGE": {
            return {
                ...state,
                messages: [...state.messages, { id: state.messages.length + 1, message: action.newMessageBody }],
            };
        }
        default:
            return state;
    }
};

type ActionsType = InferActionsType<typeof actions>;

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: "SN/DIALOGS/SEND_MESSAGE", newMessageBody } as const),
};

export default dialogsReducer;
