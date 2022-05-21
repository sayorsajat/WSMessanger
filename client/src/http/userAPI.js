import jwt_decode from "jwt-decode";
import { $host, $authHost } from "./index";

export const registration = async (userName, password) => {
    const {data} = await $host.post('api/user/registration', {userName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (userName, password) => {
    const {data} = await $host.post('api/user/login', {userName, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}