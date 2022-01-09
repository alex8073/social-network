import styled from "styled-components";

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const CheckboxGroup = styled.div`
    &,
    .ant-checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .ant-checkbox-wrapper {
        margin: 0;
    }
`;

export const SC = { List, CheckboxGroup };
