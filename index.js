require("dotenv").config();
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const http = require("http");

// ================= KEEP-ALIVE SERVER (Prevents Shutdown) =================
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot is online! 🎄");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 Keep-alive server listening on port ${PORT}`);
});

// ================= CLIENT =================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

// ================= LOAD COMMANDS =================
const commandsPath = path.join(__dirname, "commands");
if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));
  console.log(`🎄 Found ${commandFiles.length} command files.`);
  
  for (const file of commandFiles) {
    try {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      // Check for Slash Command structure (data + execute)
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Loaded command: ${command.data.name}`);
      } 
      // Fallback for older style or simple commands if any
      else if (command.name && command.execute) {
        client.commands.set(command.name, command);
        console.log(`✅ Loaded command: ${command.name}`);
      } else {
        console.warn(`⚠️  Skipped ${file}: Missing 'data' or 'execute' property.`);
      }
    } catch (error) {
      console.error(`❌ Error loading command ${file}:`, error);
    }
  }
}

// ================= LOAD EVENTS =================
const eventsPath = path.join(__dirname, "events");
if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js"));
  
  for (const file of eventFiles) {
    try {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      
      if (event.name) {
          if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
          } else {
            client.on(event.name, (...args) => event.execute(...args, client));
          }
          console.log(`✅ Loaded event: ${event.name}`);
      } else {
          console.warn(`⚠️  Skipped event ${file}: Missing 'name' property.`);
      }
    } catch (error) {
      console.error(`❌ Error loading event ${file}:`, error);
    }
  }
}

// ================= READY EVENT =================
client.once("ready", () => {
  console.log(`🎄 Bot logged in as ${client.user.tag}`);
  client.user.setActivity("🎄 Spreading Christmas cheer!", { type: 0 });
});

// ================= SAFETY =================
process.on("unhandledRejection", err => {
  console.error("❌ Unhandled promise rejection:", err);
});

process.on("uncaughtException", err => {
  console.error("❌ Uncaught exception:", err);
  // Optional: process.exit(1); // Usually safer to restart, but for a simple bot staying alive is sometimes preferred.
});

// ================= LOGIN =================
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ ERROR: DISCORD_TOKEN is missing in .env file!");
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
