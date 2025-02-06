const { createClient } = require("redis");
const crypto = require("crypto");

class SecureRedisService {
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
      // password: process.env.REDIS_PASSWORD, // Redis password
      tls: process.env.NODE_ENV === "production" ? {} : undefined, // Enable TLS in production
    });

    // Encryption key for sensitive data
    this.encryptionKey = crypto.randomBytes(32);

    this.iv = crypto.randomBytes(16);

    this.client
      .connect()
      .then(() => {
        console.log("Redis client connected");
      })
      .catch((err) => {
        console.error("Redis client connection failed", err);
      });
  }

  // Encrypt data before storing
  encrypt(text) {
    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      this.encryptionKey,
      this.iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag();
    return {
      encrypted,
      iv: this.iv.toString("hex"),
      authTag: authTag.toString("hex"),
    };
  }

  // Decrypt data after retrieval
  decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      this.encryptionKey,
      Buffer.from(encryptedData.iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));
    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  // Store OTP securely
  async storeOTP(email, otp) {
    const encryptedOTP = this.encrypt(otp);

    await this.client.setEx(
      `otp:${this.hashKey(email)}`,
      90, //90 seconds
      JSON.stringify(encryptedOTP)
    );
    console.log("OTP Stored");
  }

  // Retrieve and verify OTP
  async verifyOTP(email, userOTP) {
    const storedData = await this.client.get(`otp:${this.hashKey(email)}`);
    if (!storedData) return false;

    const encryptedData = JSON.parse(storedData);
    const decryptedOTP = this.decrypt(encryptedData);
    return decryptedOTP === userOTP;
  }

  // Hash sensitive keys
  hashKey(key) {
    return crypto.createHash("sha256").update(key).digest("hex");
  }

  // Track failed attempts
  async trackFailedAttempt(email) {
    const key = `failed:${this.hashKey(email)}`;
    await this.client.incr(key);
    await this.client.expire(key, 90); // Reset after 1 hour
  }

  // Check if account is locked
  async isAccountLocked(email) {
    const attempts = await this.client.get(`failed:${this.hashKey(email)}`);
    return parseInt(attempts) >= 5;
  }
}

module.exports = new SecureRedisService();
