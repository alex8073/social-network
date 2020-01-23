import React from 'react';
import styles from './TestDialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import {Redirect} from 'react-router-dom';

const TestDialogs = (props) => {
    let dialogsElements = props.testDialogsPage.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.testDialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    };

    let onSendMessage = () => {
        props.sendMessage();
    };

    if (!props.isAuth) {
        return <Redirect to={'/login'} />
    }

    return (
        <div className={styles.testDialogs}>
            <div className={styles.testDialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange}
                              value={props.testDialogsPage.newMessageText}/>
                </div>
                <div>
                    <button onClick={onSendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
};

export default TestDialogs;