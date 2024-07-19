import express from "express"
import {login, signup} from "../controller/Auth.js"
import {auth, isStudent, isAdmin} from "../middlewares/auth.js"
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);


//testing protected route for single middleware 
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for test "
    })
})

//Protected Route
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Students"
    })
});

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected route for Admin"
    })
})



export default router;



