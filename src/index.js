const { Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const mongo = require("./mongo");
const { loadPrefixes, cmdDetector, cmdTrigger } = require("./cmdHandler");
const { interDetector, interTrigger } = require("./interHandler");
const { registerPlayerEvents } = require("./playerEvents");
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const cookiesPath = path.join(__dirname, "..", "cookies.txt");

const player = new Player(client);

client.once("ready", async () => {
    registerPlayerEvents(player);

    cmdDetector(client);
    interDetector(client);

    await mongo().then((mongoose) => {
        try {
            console.log("Bot has connected to mongo!");
        } finally {
            mongoose.connection.close();
        }
    });

    loadPrefixes(client);

    console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
    await cmdTrigger(client, message, player);
});

client.on("interactionCreate", async (interaction) => {
    await interTrigger(client, interaction, player);
});

client.login(process.env.TOKEN);
