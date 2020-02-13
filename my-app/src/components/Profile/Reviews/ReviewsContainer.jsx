import {addReviewCreator} from '../../../redux/profileReducer';
import Reviews from "./Reviews";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addReview: (newPostText) => {
            dispatch(addReviewCreator(newPostText))
        }
    }
};

const ReviewsContainer = connect(mapStateToProps, mapDispatchToProps)(Reviews);

export default ReviewsContainer;