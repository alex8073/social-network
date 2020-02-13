import React from 'react';
import styles from './Reviews.module.css';
import DialogsItem from '../../TestDialogs/DialogsItem/DialogsItem';
import {Field, reduxForm} from 'redux-form';

const Reviews = (props) => {

    let postsElements = props.profilePage.reviews.map(p => <DialogsItem name={p.message} key={p.id} id={p.id}/>);

    let onAddPost = (value) => {
        props.addReview(value.newPostText);;
    };

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews_inner_wrapper}>
                <div className={styles.reviewsItems}>
                    {postsElements}
                </div>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
            </div>
        </div>
    )
};

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newPostText'} placeholder='Please, enter your message.'/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

export default Reviews; 