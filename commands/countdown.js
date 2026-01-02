const { SlashCommandBuilder } = require('discord.js');
const { createCountdownEmbed } = require('../utils/messages');
const config = require('../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('countdown')
        .setDescription('See how much time is left until New Year 2027! 🎆'),

    async execute(interaction) {
        try {
            const now = new Date();
            const newYear = new Date(config.newYearTarget);
            const difference = newYear - now;

            if (difference <= 0) {
                await interaction.reply({
                    content: '🎊 Happy New Year! The countdown has finished! 🎆✨',
                    ephemeral: false
                });
                return;
            }

            // Calculate time components
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const embed = createCountdownEmbed(days, hours, minutes, seconds);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in countdown command:', error);
            await interaction.reply({
                content: '❄️ Something went wrong! The elves are working on it! 🎅',
                ephemeral: true
            });
        }
    }
};
