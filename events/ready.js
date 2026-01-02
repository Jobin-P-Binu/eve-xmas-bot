const { ActivityType, Events } = require('discord.js');
const config = require('../config/config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log('🎄 =====================================');
        console.log(`🎅 Bot logged in as ${client.user.tag}`);
        console.log(`✨ Ready to spread Christmas cheer!`);
        console.log(`🌟 Serving ${client.guilds.cache.size} server(s)`);
        console.log('🎄 =====================================');

        // Set festive bot status
        try {
            client.user.setPresence({
                activities: [{
                    name: config.botStatus,
                    type: ActivityType.Custom
                }],
                status: 'online'
            });
            console.log(`🎁 Status set to: ${config.botStatus}`);
        } catch (error) {
            console.error('❌ Error setting bot status:', error);
        }
    }
};
