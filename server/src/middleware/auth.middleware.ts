import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    userId?: string;
    username?: string;
    [key: string]: any;
  };
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const decoded = verifyJwt<{ userId?: string; username?: string }>(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  req.user = { userId: decoded.userId, username: decoded.username };

  next();
};
