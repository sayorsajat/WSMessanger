const ApiError = require('../error/ApiError')
const {Message, User, Room} = require('../models/models')
const path = require('path')

class MessageController {
    async sendMessage(req, res, next) {
        const {userName, content, roomId} = req.body
        
        if (!userName || !content || !roomId) {
            return next(ApiError.badRequest('Invalid author id or content or room id'))
        }
    
        const author = await User.findOne({
            where: {
                userName,
            }
        })

        if (!author) {
            return next(ApiError.badRequest('invalid author nickname'))
        }

        if (!req.files) {
            const fileName = null;
            const message = await Message.create({userName, content, roomId, img: fileName})
            return res.json(message)
        } else {
            const {img} = req.files
            const fileName = Date.now().toString(36) + Math.random().toString(36).substr(2) + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const message = await Message.create({userName, content, roomId, img: fileName})

            const postBody = {Name: fileName}

            await fetch("http://localhost:6001/resize", {
                method: "PUT",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(postBody)
            })
            
            return res.json(message)
        }
        
        
    }

    async loadMessages(req, res, next) {
        const {roomId} = req.body
        if (!roomId) {
            return next(ApiError.badRequest('Invalid room id'))
        }
        const messages = await Message.findAll({where: {roomId}})

        return res.json(messages)
    }

    async loadRooms(req, res, next) {
        const {userId} = req.body
        if (!userId) {
            return next(ApiError.badRequest('No user id provided'))
        }
        const user = await User.findOne({where: {id: userId}})
        if (!user) {
            return next(ApiError.badRequest('Invalid user id'))
        }
        const rooms = await Room.findAll({where: {userId}})
        return res.json(rooms)
    }

    async joinRoom(req, res, next) {
        const {userId, roomId} = req.body
        if (!roomId) {
            return next(ApiError.badRequest('Invalid room id'))
        }
        const candidateRoom = await Room.findOne({where: {roomId, userId}})
        if (candidateRoom) {
            return next(ApiError.badRequest('Already joined room'))
        }
        const room = await Room.create({roomId, userId})
        return res.json(room)
    }
}

module.exports = new MessageController()