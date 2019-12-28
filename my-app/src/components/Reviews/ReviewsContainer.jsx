import React from 'react';
import { addReviewCreator, updateNewReviewBodyCreator } from '../../redux/reviewsReducer';
import Reviews from "./Reviews";

const ReviewsContainer = (props) => {
    let state = props.store.getState();

    let onPostBodyChange = (body) => {
        let action = updateNewReviewBodyCreator(body);
        props.store.dispatch(action);
    };

    let onAddReviewClick = () => {
        props.store.dispatch(addReviewCreator());
    };

    return (<Reviews updateNewReviewBody={ onPostBodyChange }
                     addReview={ onAddReviewClick }
                     reviews={state.reviewsPage.reviews}
                     newReviewBody={state.reviewsPage.newReviewBody}
    />)
};

export default ReviewsContainer;