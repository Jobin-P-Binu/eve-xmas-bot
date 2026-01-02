const { EmbedBuilder } = require('discord.js');

/**
 * Get a random item from an array
 * @param {Array} array - Array to select from
 * @returns {*} Random item from array
 */
function getRandomItem(array) {
  if (!Array.isArray(array) || array.length === 0) {
    return null;
  }
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Create a festive embed message
 * @param {string} title - Embed title
 * @param {string} description - Embed description
 * @param {string} color - Hex color (default: Christmas red)
 * @returns {EmbedBuilder} Discord embed
 */
function createFestiveEmbed(title, description, color = '#C41E3A') {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp()
    .setFooter({ text: '🎄 Code of Eve Christmas Bot' });
}

/**
 * Create a countdown embed for New Year
 * @param {number} days - Days remaining
 * @param {number} hours - Hours remaining
 * @param {number} minutes - Minutes remaining
 * @param {number} seconds - Seconds remaining
 * @returns {EmbedBuilder} Countdown embed
 */
function createCountdownEmbed(days, hours, minutes, seconds) {
  const description = `
🎆 **Time Until New Year 2027!** 🎆

📅 **${days}** days
⏰ **${hours}** hours
⏱️ **${minutes}** minutes
⏲️ **${seconds}** seconds

Get ready to celebrate! 🎉✨
  `;

  return new EmbedBuilder()
    .setTitle('🎊 New Year Countdown 🎊')
    .setDescription(description.trim())
    .setColor('#FFD700')
    .setTimestamp()
    .setFooter({ text: '🎄 Happy New Year from Code of Eve!' });
}

/**
 * Format a message with festive styling
 * @param {string} message - Message to format
 * @returns {string} Formatted message
 */
function formatFestiveMessage(message) {
  return `✨ ${message} ✨`;
}

module.exports = {
  getRandomItem,
  createFestiveEmbed,
  createCountdownEmbed,
  formatFestiveMessage
};
