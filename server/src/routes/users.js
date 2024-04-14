import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const{ username, password } = req.body;
    const user = await UserModel.findOne({username});

    if (user) {
        return res.json({ message: "User already existss"});
    }

    const hashedpassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
        username: username,
        password: hashedpassword
    })
    await newUser.save();

    res.json({message: "User registered successfully"});
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({username});
    if (!user) {
        return res.json({ message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.json({ message: "Invalid uSERNAME OR password"});
    }   
    
    const token = jwt.sign({ id: user._id}, "secret");
    res.json({token, userID: user._id})
});

export { router as userRouter };