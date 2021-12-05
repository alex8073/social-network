import { Avatar, Button, Divider, Input } from "antd";
import React, { useEffect, useState } from "react";

const { TextArea } = Input;

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

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
    return (
        <>
            <Messages />
            <AddMessageForm />
        </>
    );
};

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        wsChannel.addEventListener("message", (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        });
    }, []);

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

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState<string>("");

    const sendMessage = () => {
        if (!message) return;
        wsChannel.send(message);
        setMessage("");
    };

    return (
        <div>
            <TextArea
                style={{ width: "500px" }}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
            ></TextArea>
            <Button onClick={sendMessage}>send</Button>
        </div>
    );
};
