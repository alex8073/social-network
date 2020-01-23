import {addReviewCreator, updateNewReviewBodyCreator} from '../../../redux/profileReducer';
import Reviews from "./Reviews";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewReviewBody: (body) => {
            dispatch(updateNewReviewBodyCreator(body))
        },
        addReview: () => {
            dispatch(addReviewCreator())
        }
    }
};

const ReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(Reviews);

export default ReviewsContainer;