const jwt = require('jsonwebtoken')
const User = require("../models/user");
const {hashing, comparing} = require('../utilities/utilities')

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    if (!users.length) {
      return res.status(404).json({ message: "No Users found" });
    }

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error });
  }
};

exports.signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "provide all information" });
    }
    const hashedPassword = await hashing(password, 12)
    const existingEmailUser = await User.findOne({email})
    if(existingEmailUser){
      return res.status(409).json({message: `Account with email ${email} exists already`})
    }
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    newUser.password = undefined;
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error while adding user", error: error?.message });
  }
};

exports.signIn = async(req, res)=>{
  const {email, password} = req.body
  if(!email || !password){
    return res.status(400).json({message: "Pliz provide all info"})
  }
  try{
    const existingUser = await User.findOne({email}).select('+password')
    if(!existingUser){
      return res.status(404).json({message: `No Account matches ${email}`})
    }

    const matched = await comparing(password, existingUser.password)

    if(!matched){
      return res.status(404).json({message: "Invalid password"})
    }

    const token = jwt.sign({_id: existingUser._id, fullName: existingUser.fullName}, process.env.SECRET, {
      expiresIn: '3hr'
    })

    res.cookie('Authorization', `Bearer ${token}`, {
      httpOnly: true,
      expires: new Date(Date.now() + 3*60*60*1000),
      secure: process.env.NODE_ENV === 'production'
    })

     existingUser.password = undefined;

    return res.status(200).json({success: true, data: existingUser, token: `Bearer ${token}`})


  }catch(error){
    return res.status(500).json({message: error?.message})
  }

}
