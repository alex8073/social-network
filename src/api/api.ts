import axios, {AxiosResponse} from 'axios';
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
            .then(response => {
                return response.data
            });
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data
            });
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            });
    },

    getUserProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getUserProfile(userId);
    }
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status: status})
            .then(response => {
                return response.data;
            });
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                return response.data;
            });
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
            .then(response => {
                return response.data;
            });
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

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => {
                return response.data;
            });
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data;
            });
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            });
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};

