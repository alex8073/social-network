import { Dispatch } from "redux";
import { FormAction } from "redux-form";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api ";
import { BaseThunkType, InferActionsType } from "./redux-store";
import { v1 } from "uuid";

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType,
};

export type ChatMessageType = ChatMessageAPIType & {
    id: string;
};

export type InitialStateType = typeof initialState;

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map((m) => ({ ...m, id: v1() }))].filter(
                    (m, index, array) => index >= array.length - 100
                ),
            };
        case "SN/CHAT/STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status,
            };
        default:
            return state;
    }
};

type ActionsType = InferActionsType<typeof actions>;

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({
            type: "SN/CHAT/MESSAGES_RECEIVED",
            payload: { messages },
        } as const),
    statusChanged: (status: StatusType) =>
        ({
            type: "SN/CHAT/STATUS_CHANGED",
            payload: { status },
        } as const),
};

type ThunkType = BaseThunkType<ActionsType | FormAction>;

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        };
    }
    return _newMessageHandler;
};

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        };
    }
    return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe("message-received", newMessageHandlerCreator(dispatch));
    chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unSubscribe("message-received", newMessageHandlerCreator(dispatch));
    chatAPI.unSubscribe("status-changed", statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
};

export const sendMessage =
    (message: string): ThunkType =>
    async (dispatch) => {
        chatAPI.sendMessage(message);
    };

export default chatReducer;
