import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserStatus, getUserProfile, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void;
    getUserStatus: (userId: number) => void;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
    userId: string;
};

type OwmPropsType = RouteComponentProps<PathParamsType>;

type PropsType = MapStatePropsType & MapDispatchPropsType & OwmPropsType;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                //TODO replace push with Redirect
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId as number);
        this.props.getUserStatus(userId as number);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                />
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile,
        getUserStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter
)(ProfileContainer);
