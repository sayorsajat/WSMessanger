import { $authHost } from './index';

export const sendMessage = async (message) => {
    const {data} = await $authHost.post('api/msg/sendMessage', message);
    return data
}

export const joinRoom = async (userId, roomId) => {
    const {data} = await $authHost.post('api/msg/joinRoom', {userId, roomId})
    return data
}

export const loadRooms = async (userId) => {
    const {data} = await $authHost.post('api/msg/loadRooms', {userId})
    return data
}

export const loadMessages = async (roomId) => {
    const {data} = await $authHost.post('api/msg/loadMessages', {roomId})
    return data
}