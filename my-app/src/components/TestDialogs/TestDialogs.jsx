import React from 'react';
import classes from './TestDialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';

const TestDialogs = (props) => {
    let dialogsElements = props.testDialogsPage.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.testDialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

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
                              value={props.testDialogsPage.newMessageText}/>
                </div>
                <div>
                    <button onClick={onSendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default TestDialogs;