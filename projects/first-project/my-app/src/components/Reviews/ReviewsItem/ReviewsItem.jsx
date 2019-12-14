import React from 'react';
import classes from './../Reviews.module.css';
import { NavLink } from 'react-router-dom';

const ReviewsItem = (props) => {
    return (
        <div className={classes.reviews + ' ' + classes.active}>
            <NavLink to={'/reviews/' + props.id}>{props.name}</NavLink>
        </div>
    )
}


export default ReviewsItem; 