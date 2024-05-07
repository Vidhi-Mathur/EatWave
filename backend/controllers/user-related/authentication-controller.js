const User = require('../../models/user-related/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let blacklistedTokens = []

const generateJWTToken = async(payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY)
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
        await newUser.save()
        //Generating token
        let token = await generateJWTToken({_id: newUser._id})
        res.status(200).json({token: token, message: newUser})
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
        let token = await generateJWTToken({_id: existingUser._id})
        res.status(200).json({token: token, message: 'Logged in successfully'})
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
        res.status(200).json({message: 'Logged out successfully'})
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
        let decodedToken = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedToken
        next()
    }
    catch(err){
        next(err)
    }
}