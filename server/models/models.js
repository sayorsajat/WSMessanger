const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false},
    userName: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
    userName: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.STRING, allowNull: true},
    roomId: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true}
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false},
    roomId: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasMany(Message)
Message.belongsTo(User)

Room.hasMany(Message)
Message.belongsTo(Room)

module.exports = {
    User,
    Message,
    Room
}