/**
 * Cooldown manager to prevent spam
 */
class CooldownManager {
    constructor() {
        this.cooldowns = new Map();
    }

    /**
     * Check if an action is on cooldown
     * @param {string} key - Unique identifier (e.g., 'voice_123' or 'praise_456')
     * @param {number} duration - Cooldown duration in milliseconds
     * @returns {boolean} True if on cooldown, false otherwise
     */
    isOnCooldown(key, duration) {
        const now = Date.now();
        const lastUsed = this.cooldowns.get(key);

        if (!lastUsed) {
            return false;
        }

        return (now - lastUsed) < duration;
    }

    /**
     * Set a cooldown for a specific key
     * @param {string} key - Unique identifier
     */
    setCooldown(key) {
        this.cooldowns.set(key, Date.now());
    }

    /**
     * Get remaining cooldown time
     * @param {string} key - Unique identifier
     * @param {number} duration - Cooldown duration in milliseconds
     * @returns {number} Remaining time in milliseconds, or 0 if not on cooldown
     */
    getRemainingTime(key, duration) {
        const now = Date.now();
        const lastUsed = this.cooldowns.get(key);

        if (!lastUsed) {
            return 0;
        }

        const remaining = duration - (now - lastUsed);
        return remaining > 0 ? remaining : 0;
    }

    /**
     * Clear a specific cooldown
     * @param {string} key - Unique identifier
     */
    clearCooldown(key) {
        this.cooldowns.delete(key);
    }

    /**
     * Clear all cooldowns
     */
    clearAll() {
        this.cooldowns.clear();
    }
}

module.exports = new CooldownManager();
