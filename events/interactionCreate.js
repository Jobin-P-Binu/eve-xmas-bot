module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // Only handle slash commands
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`❌ Command not found: ${interaction.commandName}`);
            return;
        }

        try {
            console.log(`🎄 Executing command: /${interaction.commandName} by ${interaction.user.tag}`);
            await command.execute(interaction);
        } catch (error) {
            console.error(`❌ Error executing command ${interaction.commandName}:`, error);

            const errorMessage = {
                content: '❄️ Something went wrong while executing this command! The elves are investigating! 🎅',
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(errorMessage);
            } else {
                await interaction.reply(errorMessage);
            }
        }
    }
};
