const UPDATE_NEW_REVIEW_BODY = 'UPDATE-NEW-REVIEW-BODY';
const ADD_REVIEW = 'ADD-REVIEW';

let initialState = {
    reviews: [
        {id: 1, message: 'первое сообщение'},
        {id: 2, message: 'второе сообщение'},
        {id: 3, message: 'третье сообщение'}
    ],
    newReviewBody: ''
}

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_REVIEW_BODY: {
            let stateCopy = {...state};
            stateCopy.newReviewBody = action.body;
            return stateCopy;
        }
        case ADD_REVIEW: {
            let newReview = {
                id: 4,
                message: state.newReviewBody
            };
            let stateCopy = {...state};
            stateCopy.reviews = [...state.reviews];
            stateCopy.reviews.push(newReview);
            stateCopy.newReviewBody = '';
            return stateCopy;
        }
        default:
            return state;
    }
};

export const updateNewReviewBodyCreator = (body) =>
    ({type: UPDATE_NEW_REVIEW_BODY, body: body});

export const addReviewCreator = () => ({type: ADD_REVIEW});

export default reviewsReducer;