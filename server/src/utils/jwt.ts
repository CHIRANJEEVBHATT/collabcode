import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export function signJwt(payload: object, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: options?.expiresIn || "7d",
  });
}

export function verifyJwt<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (err) {
    return null;
  }
}
