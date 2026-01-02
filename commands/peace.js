const { SlashCommandBuilder } = require('discord.js');
const { getRandomItem, createFestiveEmbed } = require('../utils/messages');
const config = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('peace')
        .setDescription('Get a calming message to restore peace and harmony 🕊️'),

    async execute(interaction) {
        try {
            const peaceMessage = getRandomItem(config.peaceMessages);

            if (!peaceMessage) {
                await interaction.reply({
                    content: '🕊️ Peace is being prepared! Try again soon! ✨',
                    ephemeral: true
                });
                return;
            }

            const embed = createFestiveEmbed(
                '🕊️ Peace & Harmony 🕊️',
                peaceMessage,
                '#87CEEB'
            );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in peace command:', error);
            await interaction.reply({
                content: '❄️ Something went wrong! The elves are working on it! 🎅',
                ephemeral: true
            });
        }
    }
};
