import bcrypt from "bcrypt"
import { User } from "../model/User.js"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already Exist'
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing Password',
            })
        }

        const user = await User.create({
            name, email, password: hashedPassword, role
        })
        res.status(200).json({
            success: true,
            message: 'User Created Successfully'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered please try again later'
        });
    }
}


//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                success: false,
                message: 'Please fill all the details successfully'
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered'
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        // verify password and jwt token
        if (await bcrypt.compare(password, user.password)) {
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged In Successfully'
            });


        }
        else {
            return res.status(403).json({
                status: false,
                message: 'Password Incorrect'
            });
        }


    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Login Failure'
        })
    }


}