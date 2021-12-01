import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { selectIsFetching } from "../../redux/users-selectors";

type UsersPagePropsType = {
    pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = ({ pageTitle }) => {
    const isFetching = useSelector(selectIsFetching);
    return (
        <>
            <h2>{pageTitle}</h2>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    );
};
