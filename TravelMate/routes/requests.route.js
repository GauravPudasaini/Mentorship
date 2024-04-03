import Posts from "../models/post.model.js"
import express from "express";
const router = express.Router();
import verify from "../verify.js";

router.get("/requests", verify, async (req, res) =>
{
    
})
export default router;