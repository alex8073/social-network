import React from 'react';
import {addReviewCreator, updateNewReviewBodyCreator} from '../../redux/reviewsReducer';
import Reviews from "./Reviews";
import StoreContext from "../../StoreContext";

const ReviewsContainer = (props) => {

    // let state = props.store.getState();

    // let onPostBodyChange = (body) => {
    //     let action = updateNewReviewBodyCreator(body);
    //     props.store.dispatch(action);
    // };
    //
    // let onAddReviewClick = () => {
    //     props.store.dispatch(addReviewCreator());
    // };

    return (
        <StoreContext.Consumer>
            {store => {

                let state = store.getState();

                let onPostBodyChange = (body) => {
                    let action = updateNewReviewBodyCreator(body);
                    store.dispatch(action);
                };

                let onAddReviewClick = () => {
                    store.dispatch(addReviewCreator());
                };

                return <Reviews updateNewReviewBody={onPostBodyChange}
                                addReview={onAddReviewClick}
                                reviews={state.reviewsPage.reviews}
                                newReviewBody={state.reviewsPage.newReviewBody}/>
            }
            }
        </StoreContext.Consumer>
    )
};

export default ReviewsContainer;