import React from "react";
import classes from "../Dialogs.module.css";
import { NavLink } from "react-router-dom";

type PropsType = {
    id: number;
    name: string;
};

const DialogsItem: React.FC<PropsType> = ({ id, name }) => {
    return (
        <div className={classes.testdialogs + " " + classes.active}>
            <NavLink to={"/testdialogs/" + id}>{name}</NavLink>
        </div>
    );
};

export default DialogsItem;
