import React from 'react';
import {addReviewCreator, updateNewReviewBodyCreator} from '../../redux/reviewsReducer';
import Reviews from "./Reviews";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        reviewsPage: state.reviewsPage
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