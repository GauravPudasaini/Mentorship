import express from "express";
const router = express.Router();
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


router.get("/facebooklogin", async (req, res) => {
  const token = req.query;
  const facebookAccessToken = token.token;
  const appId = process.env.fbid;
  const appSecret = process.env.fbsecret;
//   res.status(200).json(facebookAccessToken);
  const debugTokenURL = `https://graph.facebook.com/debug_token?input_token=${facebookAccessToken}&access_token=${appId}|${appSecret}`;
  fetch(debugTokenURL)
    .then((response) => {
      const { data } = response;
      console.log(data);
      if (data.is_valid) {
        res.status(200).json({ message: "Token is valid", user });
        console.log("test1");
      } else {
        res.status(401).json({ message: "Token is invalid" });
        console.log("test2");
      }
    })
    .catch((error) => {
      res.status(500).json(error);
      console.error("Error verifying token:", error);
    });
});
export default router;
