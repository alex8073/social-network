import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    logout: () => void;
};
type OwnPropsType = {};

export type PropsType = MapPropsType & DispatchPropsType & OwnPropsType;

export default connect<MapPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { logout })(HeaderContainer);
