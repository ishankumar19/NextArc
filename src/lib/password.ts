import crypto from "node:crypto";

const SCRYPT_KEYLEN = 64;

/**
 * Hashes a plaintext password using standard scrypt.
 * Output format: `<saltHex>:<hashHex>`
 */
export function hashPassword(password: string): string {
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored `<saltHex>:<hashHex>` string.
 * Uses timing-safe equality check.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash) return false;

  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;

  const [salt, expectedHashHex] = parts;
  try {
    const derivedKey = crypto.scryptSync(password, salt, SCRYPT_KEYLEN);
    const expectedKey = Buffer.from(expectedHashHex, "hex");

    if (derivedKey.length !== expectedKey.length) {
      return false;
    }

    return crypto.timingSafeEqual(derivedKey, expectedKey);
  } catch {
    return false;
  }
}
