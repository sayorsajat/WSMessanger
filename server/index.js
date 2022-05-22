const express = require('express');
const sequelize = require('./db')
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST", "PUT", "PATCH"]
    },
})

io.on('connection', (socket) => {
    console.log("Users's id", socket.id)

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message')
    })

    socket.on('join_room', (data) => {
        socket.join(data)
    })
} )

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`It works! With port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()