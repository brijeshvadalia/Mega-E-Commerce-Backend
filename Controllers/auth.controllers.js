import User from '../models/user.schema.js'
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'
import mailHelper from '../utils/mailHelper'
import crypto from 'crypto'


export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
}


/******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/
export const signUp = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body

    if (!name || !email || !password) {
        throw new CustomError('Please fill all fields', 400)
    }
    //check if user exists
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError('User already exists', 400)  
    }

    const user = await User.create({
        name,
        email,
        password
    });
    const token = user.getJwtToken()
    console.log(user);
    user.password = undefined

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })

})

/******************************************************
 * @LOGIN
 * @route http://localhost:5000/api/auth/login
 * @description User signIn Controller for loging new user
 * @parameters  email, password
 * @returns User Object
 ******************************************************/
