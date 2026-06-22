import { Request, Response, NextFunction } from "express";
import { getAuthCookieName, parseCookies, verifyAuthToken } from "../utils/auth";

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[getAuthCookieName()];
  const payload = verifyAuthToken(token);

  if (!payload) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
