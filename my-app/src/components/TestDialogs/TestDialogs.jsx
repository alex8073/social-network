import React from 'react';
import classes from './TestDialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/testDialogsReduser';

const TestDialogs = (props) => {
    let dialogsElements = props.store.getState().testDialogsPage.dialogs.map(d => <DialogsItem name={d.name} id={d.id} />);
    let messagesElements = props.store.getState().testDialogsPage.messages.map(m => <Message message={m.message} />);

    let newMessageElement = React.createRef();

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        // let action = { type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text };
        let action = updateNewMessageTextCreator(text);
        props.store.dispatch(action);
        console.log(text);
    }

    let sendMessage = () => {
        props.store.dispatch(sendMessageCreator());
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
                        ref={newMessageElement}
                        value={props.store.getState().testDialogsPage.newMessageText} />
                </div>
                <div>
                    <button onClick={sendMessage}>Add message</button>
                </div>
            </div>
        </div>
    )
}

export default TestDialogs;