import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "bcd9b560-b9b5-4de1-9e34-3ab3ffd68429"
    }
});

export const getUsers = (currentPage = 1, pageSize = 5) => {
    return instance(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        });
};

export const authMe = () => {
    return instance(`auth/me`)
        .then(response => {
            return response.data
        });
};

export const follow = (userId) => {
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
        withCredentials: true,
        headers: {
            "API-KEY": "bcd9b560-b9b5-4de1-9e34-3ab3ffd68429"
        }
    })
        .then(response => {
            return response.data
        });
};

export const unfollow = (userId) => {
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
        withCredentials: true,
        headers: {
            "API-KEY": "bcd9b560-b9b5-4de1-9e34-3ab3ffd68429"
        }
    })
        .then(response => {
            return response.data
        });
};