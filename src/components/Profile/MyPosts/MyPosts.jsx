import React from "react";
import styles from "./MyPosts.module.css";
import DialogsItem from "../../Dialogs/DialogsItem/DialogsItem";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} placeholder="Please, enter your message." validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm);

const MyPosts = React.memo((props) => {
    let postsElements = props.profilePage.posts.map((p) => <DialogsItem name={p.message} key={p.id} id={p.id} />);

    let onAddPost = (value) => {
        props.addPost(value.newPostText);
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
