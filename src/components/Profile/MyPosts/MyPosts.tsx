import React from "react";
import styles from "./MyPosts.module.css";
import DialogsItem from "../../Dialogs/DialogsItem/DialogsItem";
import { AddNewPostFormRedux, AddNewPostFormType } from "./AddPostForm/AddPostForm";
import { PostType } from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>;
};

export type DispatchPropsType = {
    addPost: (postText: string) => void;
};

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo(({ posts, addPost }) => {
    let postsElements = posts.map((p) => <DialogsItem name={p.message} key={p.id} id={p.id} />);

    let onAddPost = (value: AddNewPostFormType) => {
        addPost(value.newPostText);
    };

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews_inner_wrapper}>
                <div className={styles.reviewsItems}>{postsElements}</div>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            </div>
        </div>
    );
});

export default MyPosts;
