import { Request, Response } from "express";
import {
  createAuthToken,
  getAuthCookieName,
  getTokenLifetimeMs,
  parseCookies,
  verifyAuthToken,
} from "../utils/auth";

const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "12345";

export async function login(req: Request, res: Response): Promise<void> {
  const { adminId, password } = req.body as { adminId?: string; password?: string };

  if (adminId !== ADMIN_ID || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid admin ID or password" });
    return;
  }

  const token = createAuthToken(adminId);

  res.cookie(getAuthCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: getTokenLifetimeMs(),
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      adminId,
    },
  });
}

export async function verifySession(req: Request, res: Response): Promise<void> {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[getAuthCookieName()];
  const payload = verifyAuthToken(token);

  if (!payload) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  res.status(200).json({
    authenticated: true,
    user: {
      adminId: payload.adminId,
    },
  });
}

export async function logout(req: Request, res: Response): Promise<void> {
  res.clearCookie(getAuthCookieName(), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
}
