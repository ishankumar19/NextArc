import crypto from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(crypto.scrypt);
const SCRYPT_KEYLEN = 64;

export const MAX_PASSWORD_LENGTH = 128;
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Validates password length boundaries.
 */
export function validatePasswordStrength(password: string): { valid: boolean; reason?: string } {
  if (!password || typeof password !== "string") {
    return { valid: false, reason: "Password is required." };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { valid: false, reason: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.` };
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return { valid: false, reason: `Password cannot exceed ${MAX_PASSWORD_LENGTH} characters.` };
  }
  return { valid: true };
}

/**
 * Asynchronously hashes a plaintext password using standard scrypt offloaded to worker threads.
 * Output format: `<saltHex>:<hashHex>`
 */
export async function hashPassword(password: string): Promise<string> {
  const check = validatePasswordStrength(password);
  if (!check.valid) {
    throw new Error(check.reason);
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Asynchronously verifies a plaintext password against a stored `<saltHex>:<hashHex>` string.
 * Uses timing-safe equality check.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (!password || !storedHash || password.length > MAX_PASSWORD_LENGTH) {
    return false;
  }

  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;

  const [salt, expectedHashHex] = parts;
  try {
    const derivedKey = (await scryptAsync(password, salt, SCRYPT_KEYLEN)) as Buffer;
    const expectedKey = Buffer.from(expectedHashHex, "hex");

    if (derivedKey.length !== expectedKey.length) {
      return false;
    }

    return crypto.timingSafeEqual(derivedKey, expectedKey);
  } catch {
    return false;
  }
}

/**
 * Synchronous legacy fallback if needed.
 */
export function hashPasswordSync(password: string): string {
  const check = validatePasswordStrength(password);
  if (!check.valid) {
    throw new Error(check.reason);
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPasswordSync(password: string, storedHash: string): boolean {
  if (!password || !storedHash || password.length > MAX_PASSWORD_LENGTH) return false;
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, expectedHashHex] = parts;
  try {
    const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
    const expectedKey = Buffer.from(expectedHashHex, "hex");
    if (derivedKey.length !== expectedKey.length) return false;
    return crypto.timingSafeEqual(derivedKey, expectedKey);
  } catch {
    return false;
  }
}
