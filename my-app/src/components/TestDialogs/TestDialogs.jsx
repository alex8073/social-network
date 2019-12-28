import React from 'react';
import classes from './TestDialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';

const TestDialogs = (props) => {
    let dialogsElements = props.dialogs.map(d => <DialogsItem name={d.name} id={d.id} />);
    let messagesElements = props.messages.map(m => <Message message={m.message} />);

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
    }

    let onSendMessage = () => {
        props.sendMessage();
    }

    return (
        <div className={classes.testDialogs}>
            <div className={classes.testDialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange}
                              value={props.newMessageText} />
                </div>
                <div>
                    <button onClick={onSendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default TestDialogs;