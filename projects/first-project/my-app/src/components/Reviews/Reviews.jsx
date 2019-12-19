import React from 'react';
import classes from './Reviews.module.css';
import ReviewsItem from './ReviewsItem/ReviewsItem';
import Message from './Message/Message';

const Reviews = (props) => {

    let reviewsElements = props.reviewsData.map(r => <ReviewsItem name={r.name} id={r.id} />);
    let messagesElements = props.messagesData.map(m => <Message message={m.message} />);

    let newMessageElement = React.createRef();

    let addMessage = () => {
        // props.addMessage();
        props.dispatch({ type: 'ADD-MESSAGE' });
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        // props.updateNewMessageText(text);
        let action = { type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text };
        props.dispatch(action);
        console.log(text);
    }


    return (
        <div className={classes.reviews}>
            <div className={classes.reviewsItems}>
                {reviewsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <div>
                    <textarea onChange={onMessageChange}
                        ref={newMessageElement}
                        value={props.newMessageText} />
                </div>
                <div>
                    <button onClick={addMessage}>Add message</button>
                </div>
            </div>
        </div>
    )
}

export default Reviews; 