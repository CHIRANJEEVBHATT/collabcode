import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { signJwt, verifyJwt } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    if (email && !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address with @" });
    }

    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(409).json({ success: false, message: "Username taken" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashed, email });

    const token = signJwt({ userId: user._id.toString(), username: user.username });

    return res.status(201).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json({ success: false, message: "Password is incorrect" });

    const token = signJwt({ userId: user._id.toString(), username: user.username });

    return res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization || "";

    const token = authHeader.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : authHeader;

    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = verifyJwt<{ userId?: string; username?: string }>(token);

    if (!decoded?.userId) return res.status(401).json({ success: false, message: "Invalid token" });

    const user = await User.findById(decoded.userId).select("username email");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed" });
  }
};
