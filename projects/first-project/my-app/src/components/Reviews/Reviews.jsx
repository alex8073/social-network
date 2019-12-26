import React from 'react';
import classes from './Reviews.module.css';
import DialogsItem from '../TestDialogs/DialogsItem/DialogsItem';
import { addReviewCreator, updateNewReviewBodyCreator } from '../../redux/reviewsReducer';

const Reviews = (props) => {
    let postsElements = props.reviews.map(p => <DialogsItem name={p.message} id={p.id} />);

    let onPostBodyChange = (e) => {
        let body = e.target.value;
        props.dispatch(updateNewReviewBodyCreator(body));
        console.log(body);
    }

    let onAddReviewClick = () => {
        props.dispatch(addReviewCreator());
    }

    return (
        <div className={classes.reviews}>
            <div className={classes.reviews_inner_wrapper}>
                <div className={classes.reviewsItems}>
                    {postsElements}
                </div>
                <div>
                    <textarea onChange={onPostBodyChange}
                        value={props.newReviewBody}
                        placeholder='Please, enter your message.' />
                </div>
                <div>
                    <button onClick={onAddReviewClick}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default Reviews; 