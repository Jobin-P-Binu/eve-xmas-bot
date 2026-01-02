const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn about the bot and its features 🎅'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setTitle('🎅 About Code of Eve Christmas Bot 🎅')
                .setDescription('Ho ho ho! I\'m your festive companion spreading Christmas cheer! 🎄')
                .addFields(
                    {
                        name: '🎁 My Purpose',
                        value: 'I bring positivity, peace, and Christmas spirit to the Code of Eve community!'
                    },
                    {
                        name: '✨ Commands',
                        value:
                            '`/christmas` - Random Christmas quotes\n' +
                            '`/cheer` - Motivational holiday messages\n' +
                            '`/countdown` - New Year countdown timer\n' +
                            '`/snow` - Snowflake animation\n' +
                            '`/peace` - Calming messages\n' +
                            '`/about` - This information'
                    },
                    {
                        name: '🎧 Voice Channel Magic',
                        value: 'I monitor voice channels and gently remind everyone to keep the Christmas spirit alive with kindness and calm! 🕊️'
                    },
                    {
                        name: '💚 Positive Reinforcement',
                        value: 'I detect kind messages and celebrate them! Keep spreading joy and I\'ll keep cheering you on! 🌟'
                    },
                    {
                        name: '🎄 Created By',
                        value: 'Made with ❤️ for the Code of Eve community\nBot Name: `codeofeve_jobinpbinu`'
                    }
                )
                .setColor('#C41E3A')
                .setTimestamp()
                .setFooter({ text: '🎄 Spreading Christmas cheer since 2026!' });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in about command:', error);
            await interaction.reply({
                content: '❄️ Something went wrong! The elves are working on it! 🎅',
                ephemeral: true
            });
        }
    }
};
