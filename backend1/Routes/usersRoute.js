import express from 'express';
import { signIn, signUp, userInfor } from '../controllers/users.js';
import { auth } from '../middleware/auth.js';
import { v4 as uuidv4 } from "uuid";
import Users from '../models/users.js'

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create new user
    const newUser = new Users({
      personal_id: uuidv4(),
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/user-infor", auth, userInfor)

export const signIn = async (req, res) => {
    console.log("BODY:", req.body); // Check if email and password are being passed correctly
  
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await Users.findOne({ email });
  
      // Check if user exists
      if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
  
      // Compare password (hashed)
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });
  
      // Create refresh token (for example, you can generate a JWT here)
      const refresh_token = createRefreshToken({ id: user._id });
  
      // Set the refresh token in the cookies or return it in the response
      const expiry = 24 * 60 * 60 * 1000; // 1 day
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/user/refresh_token',
        maxAge: expiry,
        expires: new Date(Date.now() + expiry),
      });
  
      res.json({
        success: true,
        message: "Sign In successfully!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });
  
    } catch (error) {
      console.error("SignIn Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  };

export default router