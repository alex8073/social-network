import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import { Checkbox, Empty, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { SC } from "./styled";

export interface IOption {
    label: string;
    value: string;
}

interface IListProps {
    options: IOption[];
    value: IOption[];
    onChange: (value: IOption[]) => void;
}

export const List = React.memo(
    React.forwardRef((props: IListProps, ref: React.Ref<HTMLDivElement>) => {
        const { options, value, onChange, ...rest } = props;

        const [searchTerm, setSearchTerm] = React.useState<string>("");
        const [checkedAll, setCheckedAll] = React.useState<boolean>(false);
        const [indeterminate, setIndeterminate] = React.useState<boolean>(false);

        useEffect(() => {
            setCheckedAll(options.length === value.length);
            setIndeterminate(!!value.length && value.length < options.length);
        }, [options, value]);

        const onInputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.currentTarget.value);
        }, []);

        const onCheckAllHandler = useCallback(
            (e: CheckboxChangeEvent) => {
                if (e.target.checked) {
                    onChange([...options]);
                } else {
                    onChange([]);
                }
            },
            [onChange, options]
        );

        const onCheckHandler = useCallback(
            (e: CheckboxChangeEvent) => {
                const isAlreadyChecked = value.some((i) => e.target.value === i.value);
                if (isAlreadyChecked) {
                    onChange([...value.filter((i) => i.value !== e.target.value)]);
                } else {
                    onChange([...value, ...options.filter((i) => i.value === e.target.value)]);
                }
            },
            [onChange, value, options]
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
                            checked={value.some((e) => e.value === i.value)}
                            onChange={onCheckHandler}
                        >
                            {i.label}
                        </Checkbox>
                    );
                });
        }, [options, value, searchTerm, onCheckHandler]);

        return (
            <SC.List ref={ref} {...rest}>
                <Input
                    placeholder="Search tables"
                    value={searchTerm}
                    onChange={onInputChangeHandler}
                    style={{ width: 200 }}
                />
                <SC.CheckboxGroup>
                    {!searchTerm ? checkAllCheckbox : null}
                    {optionsList.length > 0 ? optionsList : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </SC.CheckboxGroup>
            </SC.List>
        );
    })
);
