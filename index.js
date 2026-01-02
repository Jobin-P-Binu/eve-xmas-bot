require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Verify environment variables
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ ERROR: DISCORD_TOKEN is not set in .env file!');
    console.error('📝 Please create a .env file and add your bot token.');
    console.error('💡 See .env.example for reference.');
    process.exit(1);
}

// Create Discord client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

// Initialize commands collection
client.commands = new Collection();

// Load command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log('🎄 Loading commands...');
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`  ✅ Loaded command: ${command.data.name}`);
    } else {
        console.warn(`  ⚠️  Skipped ${file}: missing 'data' or 'execute' property`);
    }
}

// Load event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

console.log('🎅 Loading events...');
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(`  ✅ Loaded event: ${event.name}`);
}

// Error handling
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🎄 Shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🎄 Shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Login to Discord
console.log('🎁 Logging in to Discord...');
client.login(process.env.DISCORD_TOKEN);
