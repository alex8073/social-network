import {sendMessageCreator} from '../../redux/testDialogsReduser';
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
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(TestDialogs);