import { actions } from "../../../redux/profile-reducer";
import MyPosts, { MapPropsType, DispatchPropsType } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    };
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actions.addPostCreator })(MyPosts);

export default MyPostsContainer;
