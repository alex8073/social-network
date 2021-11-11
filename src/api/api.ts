import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "bcd9b560-b9b5-4de1-9e34-3ab3ffd68429",
    },
});

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

export type GetItemsType = {
    items: Array<UserType>;
    totalCount: number;
    error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    resultCode: RC;
    messages: Array<string>;
};
