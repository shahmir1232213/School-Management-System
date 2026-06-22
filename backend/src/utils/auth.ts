import crypto from "crypto";

const AUTH_COOKIE_NAME = "school_admin_token";
const TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 8;

interface AuthPayload {
  adminId: string;
  exp: number;
}

function toBase64Url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

function fromBase64Url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function sign(data: string): string {
  const authSecret = process.env.AUTH_SECRET || "school-management-secret";
  return crypto.createHmac("sha256", authSecret).update(data).digest("base64url");
}

export function createAuthToken(adminId: string): string {
  const payload: AuthPayload = {
    adminId,
    exp: Date.now() + TOKEN_LIFETIME_MS,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAuthToken(token?: string): AuthPayload | null {
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
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as AuthPayload;

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, cookiePart) => {
    const [key, ...valueParts] = cookiePart.trim().split("=");

    if (!key) {
      return acc;
    }

    acc[key] = decodeURIComponent(valueParts.join("="));
    return acc;
  }, {});
}

export function getAuthCookieName(): string {
  return AUTH_COOKIE_NAME;
}

export function getTokenLifetimeMs(): number {
  return TOKEN_LIFETIME_MS;
}
