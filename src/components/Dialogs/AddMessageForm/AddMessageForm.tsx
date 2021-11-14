import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Textarea } from "../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { AddMessageFormValuesType } from "../Dialogs";

const maxLength50 = maxLengthCreator(50);

type AddMessageFormValuesTypeKeys = Extract<keyof AddMessageFormValuesType, string>;

type AddMessageFormOwnPropsType = {};

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValuesType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType> = ({
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>{createField<AddMessageFormValuesTypeKeys>("Add message", "newMessageBody", [required, maxLength50], Textarea)}</div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    );
};

export default reduxForm<AddMessageFormValuesType, AddMessageFormOwnPropsType>({ form: "dialogAddMessageForm" })(AddMessageForm);
