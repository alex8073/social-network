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
    const [selectedTables, setSelectedTables] = React.useState<IOption[]>([]);
    console.log("selectedTables>>>>>>>", selectedTables);

    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    }, []);

    return (
        <SC.Option3>
            <Input placeholder="Search tables" value={searchTerm} onChange={onChangeHandler} style={{ width: 200 }} />
            <List options={mockedOptions} onChange={setSelectedTables} searchTerm={searchTerm} />
        </SC.Option3>
    );
});

interface IOption {
    label: string;
    value: string;
}

interface IListProps {
    options: IOption[];
    onChange: (checkedList: IOption[]) => void;
    searchTerm: string;
}

const List = React.memo((props: IListProps) => {
    const { options, onChange, searchTerm } = props;

    const [visibleOptions, setVisibleOptions] = React.useState<IOption[]>([]);
    const [checkedList, setCheckedList] = React.useState<IOption[]>([]);
    const [indeterminate, setIndeterminate] = React.useState<boolean>(false);
    const [checkAll, setCheckAll] = React.useState<boolean>(false);

    useEffect(() => {
        setIndeterminate(!!checkedList.length && checkedList.length < options.length);
        setCheckAll(checkedList.length === options.length);
        setVisibleOptions(options.filter((i: IOption) => i.label.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [checkedList.length, options, searchTerm]);

    useEffect(() => {}, [checkedList, onChange, options, searchTerm]);

    useEffect(() => {
        onChange(checkedList);
    }, [checkedList, onChange]);

    const onCheckHandler = useCallback(
        (e: CheckboxChangeEvent) => {
            const isAlreadyChecked = checkedList.some((i) => e.target.value === i.value);
            if (isAlreadyChecked) {
                setCheckedList((prev) => [...prev.filter((i) => i.value !== e.target.value)]);
            } else {
                setCheckedList((prev) => [...prev, ...options.filter((i) => i.value === e.target.value)]);
            }
        },
        [checkedList, options]
    );

    const onCheckAllHandler = useCallback(
        (e: CheckboxChangeEvent) => {
            setCheckedList(e.target.checked ? options : []);
        },
        [options]
    );

    const optionsList = useMemo(() => {
        return visibleOptions.map((i) => {
            return (
                <Checkbox
                    key={i.value}
                    value={i.value}
                    checked={checkedList.some((e) => e.value === i.value)}
                    onChange={onCheckHandler}
                >
                    {i.label}
                </Checkbox>
            );
        });
    }, [checkedList, onCheckHandler, visibleOptions]);

    const checkAllCheckbox = useMemo(() => {
        return (
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllHandler}
                checked={checkAll}
                disabled={visibleOptions.length === 0}
            >
                Check all
            </Checkbox>
        );
    }, [checkAll, indeterminate, onCheckAllHandler, visibleOptions.length]);

    return (
        <SC.CheckboxGroup>
            {checkAllCheckbox}
            {optionsList.length > 0 ? optionsList : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </SC.CheckboxGroup>
    );
});
