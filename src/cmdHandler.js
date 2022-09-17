const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { globalPrefix, guildPrefixes } = require("./prefixConfig.json");

module.exports.cmdDetector = async (client) => {
    client.commands = new Collection();
    client.aliases = new Collection();
    const cmdPath = path.join(__dirname, "commands");
    fs.readdirSync(cmdPath)
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
            const filePath = path.join(cmdPath, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
            if (command.data.aliases && Array.isArray(command.data.aliases))
                command.data.aliases.forEach((alias) => client.aliases.set(alias, command.data.name));
        });
    console.log(`${client.commands.size} commands loaded!`);
};

module.exports.cmdTrigger = async (client, message, player) => {
    const prefix = guildPrefixes[message.guildId] || globalPrefix;

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const messageArray = message.content.split(" ");

    const cmdName = messageArray[0].slice(prefix.length);
    let command = client.commands.get(cmdName);

    if (!command) command = client.commands.get(client.aliases.get(cmdName));

    const args = messageArray.slice(1);

    try {
        if (command) await command.run(client, message, args, player);
    } catch (error) {
        console.error(error);
        await message.reply("There was an error while executing this command!");
    }
};
