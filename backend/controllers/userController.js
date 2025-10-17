import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import validator from "validator";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email!" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        const salt = await bcrypt.genSalt(10)
        const harsedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name,
            email,
            phone,
            password: harsedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const data = req.body
        await userModel.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true }
        )
        res.json({ success: true, message: "User Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const userList = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ success: true, users })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "User Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin, updateUser, userList, deleteUser, getUser }