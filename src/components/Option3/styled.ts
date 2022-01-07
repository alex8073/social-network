import styled from "styled-components";

const Option3 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const CheckboxGroup = styled.div`
    &,
    .ant-checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 200px;
    }
    .ant-checkbox-wrapper {
        margin: 0;
    }
`;

export const SC = { CheckboxGroup, Option3 };
