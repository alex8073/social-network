import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>;
type DispatchPropsType = {};

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...rest } = props;
        if (!isAuth) return <Redirect to={"/login"} />;

        return <Component {...(rest as WCP)} />;
    };

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect,
        {}
    )(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
