"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const auth_1 = require("../utils/auth");
function requireAuth(req, res, next) {
    const cookies = (0, auth_1.parseCookies)(req.headers.cookie);
    const token = cookies[(0, auth_1.getAuthCookieName)()];
    const payload = (0, auth_1.verifyAuthToken)(token);
    if (!payload) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
