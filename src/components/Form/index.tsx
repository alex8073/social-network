import React, { useRef } from "react";
import { Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { SC } from "./styled";
import { IOption, List } from "./list";

interface IFormInput {
    firstName: string;
    selectedItems: { label: string; value: string }[];
}

const mockedOptions = [
    { label: "Apple", value: "apple" },
    { label: "Pear", value: "pear" },
    { label: "Orange2", value: "orange2" },
    { label: "Orange3", value: "orange3" },
    { label: "Orange4", value: "orange4" },
    { label: "Orange5", value: "orange5" },
    { label: "Orange6", value: "orange6" },
    { label: "Orange7", value: "orange7" },
    { label: "Orange8", value: "orange8" },
];

const defaultValue = [
    { label: "Orange3", value: "orange3" },
    { label: "Orange4", value: "orange4" },
];

export const Form = React.memo(() => {
    const { control, handleSubmit, setValue } = useForm<IFormInput>();

    const listRef = useRef(null);

    const onSubmit = (data: IFormInput) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <SC.FormLayout>
                <Controller
                    render={({ field }) => (
                        <List
                            {...field}
                            options={mockedOptions}
                            onChange={(e: IOption[]) => setValue("selectedItems", e, {})}
                            ref={listRef}
                        />
                    )}
                    name="selectedItems"
                    control={control}
                    defaultValue={defaultValue}
                />
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </SC.FormLayout>
        </form>
    );
});
