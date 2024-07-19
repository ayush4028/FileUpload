// auth isStudent, isAdmin

import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export const auth = (req, res, next) => {
    try{
        // extract jwt token
        // PENDING: Other ways to fetch token
        const token = req.body.token;
        if(!token){
            res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload; 
        }
        catch(error){
            res.status(401).json({
                success: false,
                message: 'Token is Invalid'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: 'Something went wrong, while verifying the token'
        })
    };

}

export const isStudent = (req, res, next) => {
    try{
        if(req.user.role != 'Student'){
            return res.status(401).json({
                success: false,
                message: 'This is a Protected route for Students'
            })
        }
        next();
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        })
    }
}

export const isAdmin = (req, res, next) => {
    try{
        if(req.user.role != 'Admin'){
            return res.status(401).json({
                success: false,
                message: 'This is a Protected route for Admin'
            })
        }
        next();
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        })
    }
}