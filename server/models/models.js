const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false},
    userName: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true ,allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    content: {type: DataTypes.STRING, allowNull: false},
    roomId: {type: DataTypes.INTEGER, allowNull: false},
})

const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true ,allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasMany(Message)
Message.belongsTo(User)

User.belongsToMany(Room, {through: 'User_Room'})
Room.belongsToMany(User, {through: 'User_Room'})

Room.hasMany(Message)
Message.belongsTo(Room)

module.exports = {
    User,
    Message,
    Room
}