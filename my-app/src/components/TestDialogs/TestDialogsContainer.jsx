import React from 'react';
import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/testDialogsReduser';
import TestDialogs from "./TestDialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        testDialogsPage: state.testDialogsPage
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextCreator(text));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }
    }
};

const TestDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(TestDialogs);

export default TestDialogsContainer;