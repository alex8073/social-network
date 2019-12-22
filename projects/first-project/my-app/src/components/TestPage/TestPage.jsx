import React from 'react';
import classes from './TestPage.module.css';
import ReviewsItem from '../Reviews/ReviewsItem/ReviewsItem';
import { addPostCreator, updateNewPostBodyCreator } from '../../redux/state';

const TestPage = (props) => {

    let postsElements = props.store.getState().testPagePage.posts.map(p => <ReviewsItem name={p.message} id={p.id} />);

    let onAddPostClick = () => {
        props.store.dispatch(addPostCreator());
    }

    let onPostBodyChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewPostBodyCreator(body));
        console.log(body);
    }


    return (
        <div className={classes.testPage}>
            <div className={classes.testPage_inner_wrapper}>
                <div className={classes.testPageItems}>
                    {postsElements}
                </div>
                <div>
                    <textarea onChange={onPostBodyChange}
                        value={props.store.getState().testPagePage.newPostBody}
                        placeholder='Please, enter your message.' />
                </div>
                <div>
                    <button onClick={onAddPostClick}>Send message</button>
                </div>
            </div>
        </div>
    )
}

export default TestPage;