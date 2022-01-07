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
            <List
                options={mockedOptions}
                selectedTables={selectedTables}
                onChange={setSelectedTables}
                searchTerm={searchTerm}
            />
        </SC.Option3>
    );
});

interface IOption {
    label: string;
    value: string;
}

interface IListProps {
    options: IOption[];
    selectedTables: IOption[];
    searchTerm: string;
    onChange: (checkedList: IOption[]) => void;
}

const List = React.memo((props: IListProps) => {
    const { options, selectedTables, searchTerm, onChange } = props;

    const [selectedList, setSelectedList] = React.useState<IOption[]>(selectedTables);

    const [visibleList, setVisibleList] = React.useState<IOption[]>([]);
    const [visibleCheckedList, setVisibleCheckedList] = React.useState<IOption[]>([]);

    const [indeterminate, setIndeterminate] = React.useState<boolean>(false);
    const [checkAll, setCheckAll] = React.useState<boolean>(false);

    useEffect(() => {
        setVisibleList(options.filter((i: IOption) => i.label.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [options, searchTerm]);

    useEffect(() => {
        setIndeterminate(!!visibleCheckedList.length && visibleCheckedList.length < visibleList.length);
        setCheckAll(visibleList.every((e) => visibleCheckedList.some((i) => e.value === i.value)));
    }, [visibleCheckedList, visibleList]);

    console.log("checkedList>>>", visibleCheckedList.length);
    console.log("visibleOptions>>>", visibleList.length);
    console.log("checkAll>>", checkAll);

    useEffect(() => {
        setSelectedList(visibleCheckedList);
    }, [visibleCheckedList, searchTerm, setSelectedList]);

    useEffect(() => {
        onChange(selectedList);
    }, [selectedList, onChange]);

    const onCheckAllHandler = useCallback(
        (e: CheckboxChangeEvent) => {
            if (e.target.checked) {
                setVisibleCheckedList((prev) => [...Array.from(new Set([...prev, ...visibleList]))]);
            } else {
                setVisibleCheckedList((prev) => [...prev.filter((i) => !visibleList.some((e) => i.value === e.value))]);
            }
        },
        [visibleList]
    );

    const onCheckHandler = useCallback(
        (e: CheckboxChangeEvent) => {
            const isAlreadyChecked = visibleCheckedList.some((i) => e.target.value === i.value);
            if (isAlreadyChecked) {
                setVisibleCheckedList((prev) => [...prev.filter((i) => i.value !== e.target.value)]);
            } else {
                setVisibleCheckedList((prev) => [...prev, ...visibleList.filter((i) => i.value === e.target.value)]);
            }
        },
        [visibleCheckedList, visibleList]
    );

    const checkAllCheckbox = useMemo(() => {
        return (
            <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllHandler}
                checked={checkAll}
                disabled={visibleList.length === 0}
            >
                Check all
            </Checkbox>
        );
    }, [checkAll, indeterminate, onCheckAllHandler, visibleList.length]);

    const optionsList = useMemo(() => {
        return visibleList.map((i) => {
            return (
                <Checkbox
                    key={i.value}
                    value={i.value}
                    checked={visibleCheckedList.some((e) => e.value === i.value)}
                    onChange={onCheckHandler}
                >
                    {i.label}
                </Checkbox>
            );
        });
    }, [visibleCheckedList, onCheckHandler, visibleList]);

    return (
        <SC.CheckboxGroup>
            {checkAllCheckbox}
            {optionsList.length > 0 ? optionsList : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </SC.CheckboxGroup>
    );
});
