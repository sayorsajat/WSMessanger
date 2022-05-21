const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/sendMessage', authMiddleware, messageController.sendMessage)
router.post('/joinRoom', authMiddleware, messageController.joinRoom)
router.post('/loadRooms', authMiddleware, messageController.loadRooms)
router.post('/loadMessages', authMiddleware, messageController.loadMessages)

module.exports = router