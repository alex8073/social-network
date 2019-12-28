import React from 'react';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/testDialogsReduser';
import TestDialogs from "./TestDialogs";

const TestDialogsContainer = (props) => {
    let state = props.store.getState();

    let updateNewMessageText = (text) => {
        let action = updateNewMessageTextCreator(text);
        props.store.dispatch(action);
    };

    let sendMessage = () => {
        props.store.dispatch(sendMessageCreator());
    };

    return (
        <TestDialogs updateNewMessageText={updateNewMessageText}
                     sendMessage={sendMessage}
                     dialogs={state.testDialogsPage.dialogs}
                     messages={state.testDialogsPage.messages}
                     newMessageText={state.testDialogsPage.newMessageText} />
    )
};

export default TestDialogsContainer;