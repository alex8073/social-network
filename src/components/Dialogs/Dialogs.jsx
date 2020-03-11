import React from 'react';
import styles from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import AddMessageForm from './AddMessageForm/AddMessageForm';

const Dialogs = (props) => {

    let dialogsElements = props.DialogsPage.dialogs.map(d => <DialogsItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = props.DialogsPage.messages.map(m => <Message message={m.message} key={m.id}/>);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};

export default Dialogs;