const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const mongo = require("./mongo");
const mongoose = require("mongoose");
const commandPrefixSchema = require("./schemas/setPrefixCmdSchema");

const globalPrefix = "!";
const guildPrefixes = {}; // { 'guildId' : 'prefix' }

module.exports.updateCache = (guildId, newPrefix) => {
    guildPrefixes[guildId] = newPrefix;
};

module.exports.loadPrefixes = async (client) => {
    await mongo().then(async (mongoose) => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = guild[1].id;

                const result = await commandPrefixSchema.findOne({ _id: guildId });
                // guildPrefixes[guildId] = result.prefix

                if (result != null) {
                    guildPrefixes[guildId] = await result.prefix;
                }
            }
            console.log(guildPrefixes);
        } finally {
            mongoose.connection.close();
        }
    });
};

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
