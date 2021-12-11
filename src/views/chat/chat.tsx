import { Avatar, Button, Divider, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageAPIType } from "../../api/chat-api ";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

const { TextArea } = Input;

const ChatPage: React.FC = () => {
    return <Chat />;
};

export default ChatPage;

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        };
    }, []);

    return (
        <>
            {status === "error" && <div>Some error occurred. Please refresh page.</div>}
            <Messages />
            <AddMessageForm />
        </>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 50) {
            !isAutoScroll && setIsAutoScroll(true);
        } else {
            isAutoScroll && setIsAutoScroll(false);
        }
    };

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isAutoScroll]);

    return (
        <div style={{ maxHeight: "400px", overflow: "auto" }} onScroll={scrollHandler}>
            {messages.map((m, index) => (
                <Message key={m.id} message={m} />
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
    return (
        <div>
            <Avatar src={message.photo} />
            <b style={{ marginLeft: "8px" }}>{message.userName}</b>
            <p>{message.message}</p>
            <Divider />
        </div>
    );
});

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const dispatch = useDispatch();

    const status = useSelector((state: AppStateType) => state.chat.status);

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
            <Button onClick={sendMessageHandler} disabled={status !== "ready"}>
                {/* <Button onClick={sendMessageHandler} disabled={status === "pending"}> */}
                send
            </Button>
        </div>
    );
};
