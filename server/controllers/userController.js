const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models')

const generateJwt = (id, userName) => {
    return jwt.sign(
        {id, userName},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {userName, password} = req.body;
        if (!userName || !password) {
            return next(ApiError.badRequest('Invalid userName or password'));
        }
        const candidate = await User.findOne({where: {userName}})
        if (candidate) {
            return next(ApiError.badRequest('The user already exists'));
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({userName, password: hashPassword})
        const token = generateJwt(user.id, user.userName)
        return res.json({token})
    }

    async login(req, res, next) {
        const {userName, password} = req.body
        const user = await User.findOne({where: {userName}})
        if (!user) {
            return next(ApiError.badRequest('user not found'));
        }
        let comparePassword = await bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Invalid password'))
        }
        const token = generateJwt(user.id, user.userName)
        return res.json({token})
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.userName)
        return res.json({token})
    }
}

module.exports = new UserController()