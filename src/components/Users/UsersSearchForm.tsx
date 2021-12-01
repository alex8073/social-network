import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import { selectUsersFilter } from "../../redux/users-selectors";

const usersFormSearchValidate = (values: any) => {
    const errors = {};
    return errors;
};

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = "true" | "false" | "null";

type FormType = {
    term: string;
    friend: FriendFormType;
};

export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {
    const filter = useSelector(selectUsersFilter);

    const handleSubmit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "true" ? true : values.friend === "false" ? false : null,
        };
        onFilterChanged(filter);
        setTimeout(() => setSubmitting(false), 2000);
    };
    return (
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
            validate={usersFormSearchValidate}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field name="term" type="text" />
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
