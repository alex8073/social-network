import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { SC } from "./styled";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Input, Empty } from "antd";

interface IOption3Props {}

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

export const Option3 = React.memo((props: IOption3Props) => {
    const [selectedValue, setSelectedValue] = React.useState<IOption[]>([
        { label: "Orange3", value: "orange3" },
        { label: "Orange4", value: "orange4" },
    ]);
    console.log("selectedTables>>>>>>>", selectedValue);

    return (
        <SC.Option3>
            <List options={mockedOptions} value={selectedValue} onChange={setSelectedValue} />
        </SC.Option3>
    );
});

interface IOption {
    label: string;
    value: string;
}

interface IListProps {
    options: IOption[];
    value: IOption[];
    onChange: (value: IOption[]) => void;
}

const List = React.memo((props: IListProps) => {
    const { options, value, onChange } = props;

    const [selectedOptions, setSelectedOptions] = React.useState<IOption[]>(value);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [checkedAll, setCheckedAll] = React.useState<boolean>(false);
    const [indeterminate, setIndeterminate] = React.useState<boolean>(false);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }, []);

    useEffect(() => {
        setCheckedAll(selectedOptions.length === options.length);
        setIndeterminate(!!selectedOptions.length && selectedOptions.length < options.length);
    }, [options, selectedOptions]);

    useEffect(() => {
        onChange([...selectedOptions]);
    }, [onChange, selectedOptions]);

    const onCheckAllHandler = useCallback(
        (e: CheckboxChangeEvent) => {
            if (e.target.checked) {
                setSelectedOptions([...options]);
            } else {
                setSelectedOptions([]);
            }
        },
        [options]
    );

    const onCheckHandler = useCallback(
        (e: CheckboxChangeEvent) => {
            const isAlreadyChecked = selectedOptions.some((i) => e.target.value === i.value);
            if (isAlreadyChecked) {
                setSelectedOptions((prev) => [...prev.filter((i) => i.value !== e.target.value)]);
            } else {
                setSelectedOptions((prev) => [...prev, ...options.filter((i) => i.value === e.target.value)]);
            }
        },
        [selectedOptions, options]
    );

    const checkAllCheckbox = useMemo(() => {
        return (
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllHandler} checked={checkedAll}>
                Check all
            </Checkbox>
        );
    }, [checkedAll, indeterminate, onCheckAllHandler]);

    const optionsList = useMemo(() => {
        return options
            .filter((e) => e.label.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((i) => {
                return (
                    <Checkbox
                        key={i.value}
                        value={i.value}
                        checked={selectedOptions.some((e) => e.value === i.value)}
                        onChange={onCheckHandler}
                    >
                        {i.label}
                    </Checkbox>
                );
            });
    }, [options, selectedOptions, searchTerm, onCheckHandler]);

    return (
        <>
            <Input placeholder="Search tables" value={searchTerm} onChange={onChangeHandler} style={{ width: 200 }} />
            <SC.CheckboxGroup>
                {!searchTerm ? checkAllCheckbox : null}
                {optionsList.length > 0 ? optionsList : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </SC.CheckboxGroup>
        </>
    );
});
