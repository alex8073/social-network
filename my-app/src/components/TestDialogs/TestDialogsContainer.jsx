import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/testDialogsReduser';
import TestDialogs from "./TestDialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(TestDialogs);