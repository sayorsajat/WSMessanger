const ApiError = require('../error/ApiError')
const {Message, User} = require('../models/models')

class MessageController {
    async sendMessage(req, res, next) {
        const {userId, content, roomID} = req.body
        if (!userId || !content || !roomId) {
            return next(ApiError.badRequest('Invalid author id or content or room id'))
        }
        const message = await Message.create({userId, content, roomId})
    
        const author = await User.findOne({
            where: {
                id: userId,
            }
        })
        if (!author) {
            return next(ApiError.badRequest('invalid author id'))
        }
        const authorName = author.userName

        return res.json({message, authorName})
    }

    async loadMessages(req, res, next) {
        const {roomId} = req.body
        if (!roomId) {
            return next(ApiError.badRequest('Invalid room id'))
        }
        const messages = await Message.findAll({where: {roomId}})

        return res.json(messages)
    }
}

module.exports = new MessageController()