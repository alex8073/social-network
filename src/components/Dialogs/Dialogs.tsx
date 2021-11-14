import React from "react";
import styles from "./Dialogs.module.css";
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import { InitialStateType } from "../../redux/dialogs-reducer";

type DialogsProps = {
    dialogsPage: InitialStateType;
    sendMessage: (messageText: string) => void;
};

export type AddMessageFormValuesType = {
    newMessageBody: string;
};

const Dialogs: React.FC<DialogsProps> = ({ dialogsPage, sendMessage }) => {
    let dialogsElements = dialogsPage.dialogs.map((d) => <DialogsItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = dialogsPage.messages.map((m) => <Message message={m.message} key={m.id} />);

    let addNewMessage = (values: AddMessageFormValuesType) => {
        sendMessage(values.newMessageBody);
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>{dialogsElements}</div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

export default Dialogs;
