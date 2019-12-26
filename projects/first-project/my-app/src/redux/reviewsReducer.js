const UPDATE_NEW_REVIEW_BODY = 'UPDATE-NEW-REVIEW-BODY';
const ADD_REVIEW = 'ADD-REVIEW';

const reviewsReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_REVIEW_BODY:
            state.newReviewBody = action.body;
            return state;
        case ADD_REVIEW:
            let newReview = {
                id: 4,
                message: state.newReviewBody
            };
            state.reviews.push(newReview);
            state.newReviewBody = '';
            return state;
        default:
            return state;
    }
}

export const updateNewReviewBodyCreator = (body) =>
    ({ type: UPDATE_NEW_REVIEW_BODY, body: body });

export const addReviewCreator = () => ({ type: ADD_REVIEW });

export default reviewsReducer;