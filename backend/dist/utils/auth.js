"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthToken = createAuthToken;
exports.verifyAuthToken = verifyAuthToken;
exports.parseCookies = parseCookies;
exports.getAuthCookieName = getAuthCookieName;
exports.getTokenLifetimeMs = getTokenLifetimeMs;
const crypto_1 = __importDefault(require("crypto"));
const AUTH_COOKIE_NAME = "school_admin_token";
const TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 8;
function toBase64Url(input) {
    return Buffer.from(input).toString("base64url");
}
function fromBase64Url(input) {
    return Buffer.from(input, "base64url").toString("utf8");
}
function sign(data) {
    const authSecret = process.env.AUTH_SECRET || "school-management-secret";
    return crypto_1.default.createHmac("sha256", authSecret).update(data).digest("base64url");
}
function createAuthToken(adminId) {
    const payload = {
        adminId,
        exp: Date.now() + TOKEN_LIFETIME_MS,
    };
    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const signature = sign(encodedPayload);
    return `${encodedPayload}.${signature}`;
}
function verifyAuthToken(token) {
    if (!token) {
        return null;
    }
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) {
        return null;
    }
    const expectedSignature = sign(encodedPayload);
    if (expectedSignature !== signature) {
        return null;
    }
    try {
        const payload = JSON.parse(fromBase64Url(encodedPayload));
        if (payload.exp < Date.now()) {
            return null;
        }
        return payload;
    }
    catch (error) {
        return null;
    }
}
function parseCookies(cookieHeader) {
    if (!cookieHeader) {
        return {};
    }
    return cookieHeader.split(";").reduce((acc, cookiePart) => {
        const [key, ...valueParts] = cookiePart.trim().split("=");
        if (!key) {
            return acc;
        }
        acc[key] = decodeURIComponent(valueParts.join("="));
        return acc;
    }, {});
}
function getAuthCookieName() {
    return AUTH_COOKIE_NAME;
}
function getTokenLifetimeMs() {
    return TOKEN_LIFETIME_MS;
}
