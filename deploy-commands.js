require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Verify environment variables
if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    console.error('❌ ERROR: Missing DISCORD_TOKEN or CLIENT_ID in .env file!');
    console.error('📝 Please add both to your .env file.');
    process.exit(1);
}

const commands = [];

// Load command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log('🎄 Loading commands for registration...');
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        console.log(`  ✅ Loaded: ${command.data.name}`);
    } else {
        console.warn(`  ⚠️  Skipped ${file}: missing 'data' or 'execute' property`);
    }
}

// Create REST instance
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Deploy commands
(async () => {
    try {
        console.log(`\n🎅 Registering ${commands.length} slash commands...`);

        let data;

        if (process.env.GUILD_ID) {
            // Guild-specific deployment (faster for testing)
            console.log(`📍 Deploying to guild: ${process.env.GUILD_ID}`);
            data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands }
            );
        } else {
            // Global deployment (takes up to 1 hour to propagate)
            console.log('🌍 Deploying globally (may take up to 1 hour)...');
            data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );
        }

        console.log(`\n✨ Successfully registered ${data.length} slash commands!`);
        console.log('🎄 Commands registered:');
        data.forEach(cmd => console.log(`  • /${cmd.name}`));

    } catch (error) {
        console.error('❌ Error deploying commands:', error);
        process.exit(1);
    }
})();
