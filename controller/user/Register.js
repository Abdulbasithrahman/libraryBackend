import User from "../../models/User.js";
import bcrypt from 'bcrypt'

const UserRegister = async (req, res) => {
  try {
    const {name,email,password} = req.body
    
    const existingUser = await User.findOne({email})
    if(existingUser) return res.status(400).json({message:"User already exists"})
      
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)
      
    const newUser = new User({
      name:name,
      email:email,
      password:hashedPassword,
      role:'Member'
    })
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
      res.status(500).json({message:"Internal Server Error",error:error.message})
  }
  };
  
export default UserRegister
  