const { SlashCommandBuilder } = require('discord.js');
const { getRandomItem, createFestiveEmbed } = require('../utils/messages');
const config = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('christmas')
        .setDescription('Get a random Christmas quote or blessing! 🎄'),

    async execute(interaction) {
        try {
            const quote = getRandomItem(config.christmasQuotes);

            if (!quote) {
                await interaction.reply({
                    content: '🎄 Oops! Santa seems to have misplaced the quotes. Try again! ❄️',
                    ephemeral: true
                });
                return;
            }

            const embed = createFestiveEmbed(
                '🎄 Christmas Wisdom 🎄',
                quote,
                '#165B33'
            );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in christmas command:', error);
            await interaction.reply({
                content: '❄️ Something went wrong! The elves are working on it! 🎅',
                ephemeral: true
            });
        }
    }
};
