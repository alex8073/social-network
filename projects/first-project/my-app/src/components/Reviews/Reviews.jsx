import React from 'react';
import classes from './Reviews.module.css';
import { NavLink } from 'react-router-dom';

const ReviewsItem = (props) => {
    return (
        <div className={classes.reviews + ' ' + classes.active}>
            <NavLink to={'/reviews/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

const Reviews = (props) => {

    let reviewsData = [
        { id: 1, name: 'Вася' },
        { id: 2, name: 'Петя' },
        { id: 3, name: 'Дима' },
        { id: 4, name: 'Вера' },
        { id: 5, name: 'Валя' },
    ]

    let messagesData = [
        { id: 1, message: 'Замечательно' },
        { id: 2, message: 'Здорово' },
        { id: 3, message: 'Отлично' },
    ]

    let reviewsElements = reviewsData.map(r => <ReviewsItem name={r.name} id={r.id} />);
    let messagesElements = messagesData.map(m => <Message message={m.message} />);

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