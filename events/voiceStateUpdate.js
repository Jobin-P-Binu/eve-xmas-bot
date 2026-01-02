const { getRandomItem } = require('../utils/messages');
const cooldownManager = require('../utils/cooldown');
const config = require('../config/config.json');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        try {
            // Get the channel where activity occurred
            const channel = newState.channel || oldState.channel;
            if (!channel) return;

            // Check cooldown for this channel
            const cooldownKey = `voice_${channel.id}`;
            const cooldownDuration = config.cooldowns.voiceReminder;

            if (cooldownManager.isOnCooldown(cooldownKey, cooldownDuration)) {
                return; // Don't spam reminders
            }

            // Detect voice activity changes that might indicate increased activity
            const shouldSendReminder =
                // User joined a channel with multiple people
                (newState.channel && newState.channel.members.size >= 3 && !oldState.channel) ||
                // User unmuted themselves (might be getting ready to speak)
                (oldState.selfMute && !newState.selfMute) ||
                // User started speaking (serverMute or serverDeaf changed)
                (oldState.serverMute && !newState.serverMute);

            if (shouldSendReminder) {
                // Find a text channel to send the reminder
                const guild = newState.guild;
                let textChannel = null;

                // Try to find a general or main chat channel
                const channelNames = ['general', 'chat', 'main', 'lobby'];
                for (const name of channelNames) {
                    textChannel = guild.channels.cache.find(
                        ch => ch.name.toLowerCase().includes(name) && ch.isTextBased()
                    );
                    if (textChannel) break;
                }

                // If no specific channel found, get the first available text channel
                if (!textChannel) {
                    textChannel = guild.channels.cache.find(ch => ch.isTextBased());
                }

                if (textChannel) {
                    const reminder = getRandomItem(config.voiceReminders);
                    if (reminder) {
                        await textChannel.send(reminder);
                        cooldownManager.setCooldown(cooldownKey);
                        console.log(`🎄 Sent voice reminder to ${guild.name} - ${textChannel.name}`);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Error in voiceStateUpdate:', error);
        }
    }
};
