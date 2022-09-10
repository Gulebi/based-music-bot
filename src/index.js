const { Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const dotenv = require("dotenv");
const cmdHandler = require("./cmdHandler");
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

const player = new Player(client);

client.once("ready", () => {
    cmdHandler.cmdDetector(client);
    console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
    cmdHandler.cmdTrigger(client, message, player);
});

client.login(process.env.TOKEN);
