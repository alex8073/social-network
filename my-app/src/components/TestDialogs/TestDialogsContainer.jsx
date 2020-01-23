import React from 'react';
import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/testDialogsReduser';
import TestDialogs from "./TestDialogs";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

let mapStateToProps = (state) => {
    return {
        testDialogsPage: state.testDialogsPage,
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

let AuthRedirectComponent = withAuthRedirect(TestDialogs);

const TestDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default TestDialogsContainer;