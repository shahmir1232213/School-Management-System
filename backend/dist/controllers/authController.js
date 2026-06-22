"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.verifySession = verifySession;
exports.logout = logout;
const auth_1 = require("../utils/auth");
const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "12345";
async function login(req, res) {
    const { adminId, password } = req.body;
    if (adminId !== ADMIN_ID || password !== ADMIN_PASSWORD) {
        res.status(401).json({ error: "Invalid admin ID or password" });
        return;
    }
    const token = (0, auth_1.createAuthToken)(adminId);
    res.cookie((0, auth_1.getAuthCookieName)(), token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: (0, auth_1.getTokenLifetimeMs)(),
    });
    res.status(200).json({
        message: "Login successful",
        user: {
            adminId,
        },
    });
}
async function verifySession(req, res) {
    const cookies = (0, auth_1.parseCookies)(req.headers.cookie);
    const token = cookies[(0, auth_1.getAuthCookieName)()];
    const payload = (0, auth_1.verifyAuthToken)(token);
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
async function logout(req, res) {
    res.clearCookie((0, auth_1.getAuthCookieName)(), {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    res.status(200).json({ message: "Logged out successfully" });
}
