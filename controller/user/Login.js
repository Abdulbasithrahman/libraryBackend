import User from "../../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const UserLogin = async (req, res) => {
    try {
        const { password, email } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) return res.status(400).json("Email doesn't exist")

        const pwtMatch = await bcrypt.compare(password, user.password)
        if (!pwtMatch) return res.status(400).json("Password not matching")
        const token = jwt.sign({
            _id: user._id, email: user.email, role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ message: "User Login Successfully", token: token })
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message })
    }

}

