import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

$authHost.interceptors.request.use(function (config) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export {
    $host,
    $authHost
}