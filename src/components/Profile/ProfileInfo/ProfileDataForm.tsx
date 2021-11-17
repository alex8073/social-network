import React from "react";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import styles from "../../common/FormsControls/FormsControls.module.css";
import { ProfileType } from "../../../types/types";

type OwnPropsType = {
    profile: ProfileType;
};

type FormValuesTypeKeys = Extract<keyof ProfileType, string>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType> = ({ profile, handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <b>Full name: </b>
                {createField<FormValuesTypeKeys>("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b>
                {createField<FormValuesTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                <b>My professional skills: </b>
                {createField<FormValuesTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me: </b>
                {createField<FormValuesTypeKeys>("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts: </b>
                {Object.keys(profile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <b>{key}: </b>
                            {/* TODO creat solution for embedded object */}
                            {createField(key, "contacts." + key, [], Input)}
                        </div>
                    );
                })}
            </div>
        </form>
    );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, OwnPropsType>({ form: "edit-profile" })(ProfileDataForm);

export default ProfileDataFormReduxForm;
