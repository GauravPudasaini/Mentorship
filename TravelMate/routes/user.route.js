import {Router} from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = Router()

router.post("/registration", async (req, res) => {
  try {
    // console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedpass,
    });
    console.log(newUser);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error + ". Error registering");
  }
});
router.post("/logout", async (req, res) => {
  try {
    // console.log(req.body);
    if (req.headers.authorization) {
      req.headers.authorization = "";
      res.status(200).json("Logged out successfully");
    } else {
      res.status(500).json("You need to Login first");

    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  // console.log("here")
  const name = req.body.username;
  const pass = req.body.password;
  try {
    if (name && pass != "") {
      const find = await User.findOne({ username: name });
      const match = await bcrypt.compare(pass, find.password);
      if (match) {
        const accesstoken = jwt.sign({ id: find._id }, process.env.secretkey);
        // console.log(req.headers.authorization);
        req.headers.authorization = `Bearer ${accesstoken}`;
        // console.log(req.headers.authorization);
        res
          .status(200)
          .json({ username: find.username, accesstoken: accesstoken });
      } else {
        res.status(403).json("Wrong credentials");
      }
    } else {
      res.status(403).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
export default router;