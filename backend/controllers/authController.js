const User = require('../models/User')
const { httpCodes } = require('../config');

/**
 * @description Register a new user.
 */
const register = async (req,res)=>{
    try {
        const {name,email,password} =req.body

        // if (password !== passwordConfirm) {
        //     next(new ApiError('Password and password confirm must be same!', httpCodes.BAD_REQUEST));
        //     return;
        // }
        //
        // const userExists = await User.countDocuments({ email }) > 0;
        // if (userExists) {
        //     return res.status(httpCodes.BAD_REQUEST).json({ error: 'User already exists!' });
        // }

        const user = new User({name,email,password})

        user.save()

        res.status(httpCodes.CREATED).json({ success: true, message:'User Registered successfully', error: null });
    }catch (error){
        res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
}

const login = async (req,res) =>{
    try {
        const {email, password} = req.body

        const user = await User.findOne({email}).select('+password')

        if (!user) {
            return res.status(httpCodes.NOT_FOUND).json({ success: false, message: 'User not found', error: null });
        }

        if (user.password !== password) {
            return res.status(httpCodes.UNAUTHORIZED).json({ success: false, message: 'Incorrect password', error: null });
        }

        res.status(httpCodes.OK).json({success: true, user, error: null});
    }catch (error) {
        res.status(httpCodes.BAD_REQUEST).json({ message: error });
    }
}

// Exports of this file.
module.exports = {register, login}