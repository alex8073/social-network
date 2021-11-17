import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../../utils/validators/validators";
import { createField, Textarea } from "../../../common/FormsControls/FormsControls";

const maxLength50 = maxLengthCreator(50);

export type AddNewPostFormType = {
    newPostText: string;
};

type OwnProps = {};

type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewPostFormType, string>;

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormType, OwnProps> & OwnProps> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>{createField<AddNewPostFormValuesTypeKeys>("Please, enter your message.", "newPostText", [required, maxLength50], Textarea)}</div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

export const AddNewPostFormRedux = reduxForm<AddNewPostFormType, OwnProps>({ form: "ProfileAddNewPostForm" })(AddNewPostForm);
