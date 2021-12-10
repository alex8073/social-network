import { Avatar, Button, Divider, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chat-api ";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

const { TextArea } = Input;

const ChatPage: React.FC = () => {
    return <Chat />;
};

export default ChatPage;

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    return (
        <>
            <Messages />
            <AddMessageForm />
        </>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);

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
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending");
    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!message) return;
        dispatch(sendMessage(message));
        setMessage("");
    };

    return (
        <div>
            <TextArea
                style={{ width: "500px" }}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
            ></TextArea>
            <Button onClick={sendMessageHandler} disabled={false}>
                send
            </Button>
        </div>
    );
};