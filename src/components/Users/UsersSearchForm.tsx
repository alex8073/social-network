import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";

const usersFormSearchValidate = (values: any) => {
    const errors = {};
    return errors;
};

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
    term: string;
    friend: "true" | "false" | "null";
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
    const handleSubmit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "true" ? true : values.friend === "false" ? false : null,
        };
        onFilterChanged(filter);
        setTimeout(() => setSubmitting(false), 2000);
    };

    return (
        <Formik initialValues={{ term: "", friend: "null" }} validate={usersFormSearchValidate} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only Followed</option>
                        <option value="false">Only UnFollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    );
});
