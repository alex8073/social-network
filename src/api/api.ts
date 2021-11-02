import axios from 'axios';
import {ProfileType} from '../types/types';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "bcd9b560-b9b5-4de1-9e34-3ab3ffd68429"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data);
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(res => res.data);
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data);
    },

    getUserProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getUserProfile(userId);
    }
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(res => res.data);
    },

    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(res => res.data);
    },

    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status: status})
            .then(res => res.data);
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.data);
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
            .then(res => res.data);
    }
};

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}


type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        id: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

type LogoutResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(res => res.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },

    logout() {
        return instance.delete<LogoutResponseType>(`auth/login`)
            .then(res => res.data);
    }
};

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data);
    }
};

