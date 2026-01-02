const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snow')
        .setDescription('Watch a beautiful snowflake animation ❄️'),

    async execute(interaction) {
        try {
            // Create a fun snowflake animation with emojis
            const snowflakes = '❄️ ☃️ ⛄ 🌨️ ❄️ ☃️ ⛄ 🌨️ ❄️ ☃️';
            const snowLines = [
                '❄️　　　　　　　❄️　　　　　　❄️',
                '　　❄️　　　　　　　❄️　　　　',
                '　　　　❄️　　　　　　　❄️　　',
                '❄️　　　　❄️　　　　　　　　❄️',
                '　　❄️　　　　　❄️　　　　　　',
                '　　　　　　❄️　　　　❄️　　　'
            ];

            const snowAnimation = `
🌨️ **Let It Snow!** 🌨️

${snowLines.join('\n')}

${snowflakes}

*Winter wonderland vibes!* ✨
      `;

            await interaction.reply(snowAnimation.trim());
        } catch (error) {
            console.error('Error in snow command:', error);
            await interaction.reply({
                content: '❄️ Something went wrong! The elves are working on it! 🎅',
                ephemeral: true
            });
        }
    }
};
