import React from 'react';
import classes from './Comments.module.css';
import { NavLink } from 'react-router-dom';

const CommentsItem = (props) => {
    return (
        <div className={classes.comment + ' ' + classes.active}>
            <NavLink to={'/comments/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

const Comments = (props) => {
    return (
        <div className={classes.comments}>
            <div className={classes.commentsItems}>
                <CommentsItem name='Вася' id='1' />
                <CommentsItem name='Петя' id='2' />
                <CommentsItem name='Дима' id='3' />
                <CommentsItem name='Вера' id='4' />
                <CommentsItem name='Валя' id='5' />
            </div>
            <div className={classes.messages}>
                <Message message='Привет' />
                <Message message='Здорово' />
                <Message message='Отлично' />
            </div>
        </div>
    )
}

export default Comments;