let subscribers = [] as SubscriberType[];

let ws: WebSocket | null = null;

const closeWsHandler = () => {
    setTimeout(() => createChannel(), 3000);
};

const sendMessageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach((s) => s(newMessages));
};

function createChannel() {
    ws?.removeEventListener("close", closeWsHandler);
    ws?.close();

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    ws.addEventListener("close", closeWsHandler);
    ws.addEventListener("message", sendMessageHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        closeWsHandler();
        ws?.removeEventListener("close", closeWsHandler);
        ws?.removeEventListener("message", sendMessageHandler);
        ws?.close();
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback);
        return () => {
            subscribers.filter((s) => s !== callback);
        };
    },
    unSubscribe(callback: SubscriberType) {
        subscribers.filter((s) => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};

type SubscriberType = (messages: ChatMessageType[]) => void;

export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};
