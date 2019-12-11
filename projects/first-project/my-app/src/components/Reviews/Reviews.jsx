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
        {id:1, message: 'Замечательно'},
        {id:2, message: 'Здорово'},
        {id:3, message: 'Отлично'},
    ]



    return (
        <div className={classes.reviews}>
            <div className={classes.reviewsItems}>
                <ReviewsItem name={reviewsData[0].name} id={reviewsData[0].id} />
                <ReviewsItem name={reviewsData[1].name} id={reviewsData[1].id} />
                <ReviewsItem name={reviewsData[2].name} id={reviewsData[2].id} />
                <ReviewsItem name={reviewsData[3].name} id={reviewsData[3].id} />
                <ReviewsItem name={reviewsData[4].name} id={reviewsData[4].id} />
            </div>
            <div className={classes.messages}>
                <Message message={messagesData[0].message} />
                <Message message={messagesData[1].message} />
                <Message message={messagesData[2].message} />
            </div>
        </div>
    )
}

export default Reviews;