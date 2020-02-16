import React from 'react';
import classes from '../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogsItem = (props) => {
    return (
        <div className={classes.testdialogs + ' ' + classes.active}>
            <NavLink to={'/testdialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}


export default DialogsItem; 