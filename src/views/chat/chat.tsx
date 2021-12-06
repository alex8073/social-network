import { Avatar, Button, Divider, Input } from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;

export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

const ChatPage: React.FC = () => {
    return <Chat />;
};

export default ChatPage;

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;
        const closeWsHandler = () => {
            setTimeout(() => createChannel(), 3000);
        };

        function createChannel() {
            ws?.removeEventListener("close", closeWsHandler);
            ws?.close();

            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
            ws.addEventListener("close", closeWsHandler);
            setWsChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener("close", closeWsHandler);
            ws.close();
        };
    }, []);

    return (
        <>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </>
    );
};

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        const sendMessageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };
        wsChannel?.addEventListener("message", sendMessageHandler);
        return () => {
            wsChannel?.removeEventListener("message", sendMessageHandler);
        };
    }, [wsChannel]);

    return (
        <div style={{ maxHeight: "400px", overflow: "auto" }}>
            {messages.map((m, index) => (
                <Message key={index} message={m} />
            ))}
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <Avatar src={message.photo} />
            <b style={{ marginLeft: "8px" }}>{message.userName}</b>
            <p>{message.message}</p>
            <Divider />
        </div>
    );
};

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState<string>("");
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready");
        };
        wsChannel?.addEventListener("open", openHandler);
        return () => {
            wsChannel?.removeEventListener("open", openHandler);
        };
    }, [wsChannel]);

    const sendMessage = () => {
        if (!message) return;
        wsChannel?.send(message);
        setMessage("");
    };

    return (
        <div>
            <TextArea
                style={{ width: "500px" }}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
            ></TextArea>
            <Button onClick={sendMessage} disabled={wsChannel !== null && readyStatus !== "ready"}>
                send
            </Button>
        </div>
    );
};
