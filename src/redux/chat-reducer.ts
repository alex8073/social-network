import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { chatAPI, ChatMessageType } from "../api/chat-api ";
import { BaseThunkType, InferActionsType } from "./redux-store";

let initialState = {
    messages: [] as ChatMessageType[],
};

export type InitialStateType = typeof initialState;

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            };
        default:
            return state;
    }
};

type ActionsType = InferActionsType<typeof actions>;

const actions = {
    messagesReceived: (messages: ChatMessageType[]) =>
        ({
            type: "SN/CHAT/MESSAGES_RECEIVED",
            payload: { messages },
        } as const),
};

type ThunkType = BaseThunkType<ActionsType | FormAction>;

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unSubscribe(newMessageHandlerCreator(dispatch));
    chatAPI.stop();
};

export const sendMessage =
    (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message);
    };

export default chatReducer;
