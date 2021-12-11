const subscribers = {
    "message-received": [] as MessagesReceivedSubscriberType[],
    "status-changed": [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;
type EventsNamesType = "message-received" | "status-changed";

const closeWsHandler = () => {
    notifySubscribersAboutStatus("pending");
    setTimeout(() => createChannel(), 3000);
};

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers["message-received"].forEach((s) => s(newMessages));
};

const openHandler = () => {
    notifySubscribersAboutStatus("ready");
};

const errorHandler = () => {
    notifySubscribersAboutStatus("error");
    console.error("Refresh page.");
};

const cleanUp = () => {
    ws?.removeEventListener("close", closeWsHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("error", errorHandler);
};

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((s) => s(status));
};

function createChannel() {
    cleanUp();
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus("pending");
    ws.addEventListener("close", closeWsHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers["message-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
        };
    },
    unSubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = "pending" | "ready" | "error";
