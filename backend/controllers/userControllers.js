const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @router  POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async(req,res) => {
    const { username, email, password } = req.body

    if(!username || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    // Check if user exists
    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Login user
// @router  GET /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body

    // Check for user email & password
    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
})

// @desc    Change user's password using email
// @router  PUT /api/users/forgot-passsword
// @access  Public
const forgotUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body

    if(!email) {
        res.status(400)
        throw new Error('Please add email')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if(userExists) {

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // Update password
        const user = await User.findOneAndUpdate(
            { email: email },
            { password: hashedPassword},
            { returnOriginal: false }
        )

        if(user) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: generateToken(user._id),
            })
        }

    } else {
        res.status(400)
        throw new Error('User not found, please register')
    }
})

// @desc    Generate JWT
// @access  Private
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { registerUser, loginUser, forgotUser }