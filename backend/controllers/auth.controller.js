import { generateTokenAndSetCookies } from '../utils/generateToken.js';
import { User } from './../models/user.model.js';
import bcryptjs from "bcryptjs";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        // Check for missing fields
        if (!email || !username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Check if email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Generate random profile picture
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.jpg", "/avatar3.jpg"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

            generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();

            //remove password from the response
            return res.status(201).json({
                success: true, user: {
                    ...newUser._doc,
                    password: ""
                }
            });
        



    } catch (error) {
        console.log("Error during signup:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }

        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({success:false,message:"Invalid credentials"});
        }

        const isPasswordCorrect=await bcryptjs.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }

        generateTokenAndSetCookies(user._id,res);
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
        })
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"})
    }
}


export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}