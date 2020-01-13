import React from 'react';
import styles from './Reviews.module.css';
import DialogsItem from '../../TestDialogs/DialogsItem/DialogsItem';

const Reviews = (props) => {

    let postsElements = props.profilePage.reviews.map(p => <DialogsItem name={p.message} key={p.id} id={p.id} />);

    let onPostBodyChange = (e) => {
        let body = e.target.value;
        props.updateNewReviewBody(body);
    };

    let onAddReviewClick = () => {
        props.addReview();
    };

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews_inner_wrapper}>
                <div className={styles.reviewsItems}>
                    {postsElements}
                </div>
                <div>
                    <textarea onChange={onPostBodyChange}
                        value={props.profilePage.newReviewBody}
                        placeholder='Please, enter your message.' />
                </div>
                <div>
                    <button onClick={onAddReviewClick}>Add review</button>
                </div>
            </div>
        </div>
    )
};

export default Reviews; 