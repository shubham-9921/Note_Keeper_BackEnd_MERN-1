const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateJWT");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
        res.status(400);
        throw new Error("User Already Exists!");
    }

    const user = await User.create({
        name, email, password, pic
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin: user.isAdmin,
            token: generateToken(user.id)
        })
    } else {
        res.status(400);
        throw new Error("Error in Registration");
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),


        });
    } else {
        res.status(400);
        throw new Error("Invalid Credential!");

    }
})
module.exports = { registerUser, authUser }