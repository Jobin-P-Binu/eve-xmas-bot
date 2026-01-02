const { SlashCommandBuilder } = require('discord.js');
const { getRandomItem, createFestiveEmbed } = require('../utils/messages');
const config = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cheer')
        .setDescription('Get a motivational holiday message to brighten your day! ✨'),

    async execute(interaction) {
        try {
            const cheerMessage = getRandomItem(config.cheerMessages);

            if (!cheerMessage) {
                await interaction.reply({
                    content: '🎅 The cheer machine is recharging! Try again soon! ✨',
                    ephemeral: true
                });
                return;
            }

            const embed = createFestiveEmbed(
                '✨ Holiday Cheer ✨',
                cheerMessage,
                '#FFD700'
            );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in cheer command:', error);
            await interaction.reply({
                content: '❄️ Something went wrong! The elves are working on it! 🎅',
                ephemeral: true
            });
        }
    }
};
