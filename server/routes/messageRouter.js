const Router = require('express')
const router = new Router()
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/sendMessage', authMiddleware, messageController.sendMessage)
router.get('/loadMessages', authMiddleware, messageController.loadMessages)

module.exports = router