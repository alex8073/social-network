import React from 'react';
import classes from './Reviews.module.css';
import ReviewsItem from './ReviewsItem/ReviewsItem';
import Message from './Message/Message';

const Reviews = (props) => {

    let reviewsElements = props.reviewsData.map(r => <ReviewsItem name={r.name} id={r.id} />);
    let messagesElements = props.messagesData.map(m => <Message message={m.message} />);

    return (
        <div className={classes.reviews}>
            <div className={classes.reviewsItems}>
                {reviewsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Reviews; 