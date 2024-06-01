require('dotenv').config()
const User = require('../../models/user-related/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let blacklistedTokens = []

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY)
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY)
}

exports.postSignup = async(req, res, next) => {
    try {
        const {name, email, password} = req.body
        let existingUser = await User.findOne({ email })
        //User already exists
        if(existingUser){
            return res.status(409).json({message: 'User already exists, try login instead'})
        }
        let hashedPassword = await bcrypt.hash(password, 12)
        //Create user
        let newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        //Generating token
        let accessToken = generateAccessToken({ _id: newUser._id })
        let refreshToken = generateRefreshToken({ _id: newUser._id })
        newUser.refreshToken = refreshToken
        await newUser.save()
        res.status(200).json({accessToken, refreshToken, message: newUser})
    }
    catch(err) {
        next(err)
    }
}

exports.postLogin = async(req, res, next) => {
    try {
        const {email, password} = req.body
        let existingUser = await User.findOne({ email })
        //Email doesn't exist, so signup
        if(!existingUser){
            return res.status(404).json({message: 'No User found. Try signup instead'})
        }
        let validPassword = await bcrypt.compare(password, existingUser.password)
        //Incorrect password
        if(!validPassword){
            return res.status(401).json({message: 'Incorrect password'})
        }
        //Generating token
        let accessToken = generateAccessToken({ _id: existingUser._id })
        let refreshToken = generateRefreshToken({ _id: existingUser._id })
        existingUser.refreshToken = refreshToken
        await existingUser.save()
        res.status(200).json({accessToken, refreshToken, message: 'Logged in successfully'})
    }
    catch(err){
        next(err)
    }
}

exports.postLogout = async(req, res, next) => {
    try {
        let authorization = await req.headers.authorization
        if(!authorization) return res.status(401).json({message: 'Unauthorized'})
        //Not a token
        let token = await authorization.split(' ')[1]
        blacklistedTokens.push(token)
        const email = jwt.decode(token)
        await User.findByIdAndUpdate({email}, {$unset: {refreshToken: 1}})
        res.status(200).json({message: 'Logged out successfully'})
    }
    catch(err) {
        next(err)
    }
}

exports.refreshToken = async(req, res, next) => {
    try {
        const { refreshToken } = req.body
        if(!refreshToken) return res.status(401).json({ message: 'Unauthorized' })
        let decodedToken = await jwt.verify(token, process.env.REFRESH_SECRET_KEY)
        const user = await User.findById(decodedToken._id)
        if(!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Unauthorized' })
        const newAccessToken = generateAccessToken({_id: user._id})
        res.status(200).json({ accessToken: newAccessToken })
    }
    catch(err) {
        next(err)
    }
}

exports.authorizationMiddleware = async(req, res, next) => {
    try {
        //No authorization header set
        let authorization = await req.headers.authorization
        if(!authorization) return res.status(401).json({message: 'Unauthorized'})
        //Not a token
        let token = await authorization.split(' ')[1]
        if(!token || blacklistedTokens.includes(token)) return res.status(401).json({message: 'Unauthorized'})
        //Verify
        let decodedToken = await jwt.verify(token, process.env.ACCESS_SECRET_KEY)
        req.user = decodedToken
        next()
    }
    catch(err){
        next(err)
    }
}