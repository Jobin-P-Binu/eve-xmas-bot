const { getRandomItem } = require('../utils/messages');
const cooldownManager = require('../utils/cooldown');
const config = require('../config/config.json');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        try {
            // Ignore bot messages
            if (message.author.bot) return;

            // Check if message contains kindness keywords
            const messageContent = message.content.toLowerCase();
            const containsKindness = config.kindnessKeywords.some(keyword =>
                messageContent.includes(keyword.toLowerCase())
            );

            if (!containsKindness) return;

            // Check cooldown for this user
            const cooldownKey = `praise_${message.author.id}`;
            const cooldownDuration = config.cooldowns.praiseMessage;

            if (cooldownManager.isOnCooldown(cooldownKey, cooldownDuration)) {
                return; // Don't spam praise messages
            }

            // Send praise message
            const praiseMessage = getRandomItem(config.praiseMessages);
            if (praiseMessage) {
                await message.reply(praiseMessage);
                cooldownManager.setCooldown(cooldownKey);
                console.log(`🌟 Sent praise message to ${message.author.tag}`);
            }
        } catch (error) {
            console.error('❌ Error in messageCreate:', error);
        }
    }
};
