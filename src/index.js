const { Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const dotenv = require("dotenv");
const path = require("path");
const { cmdDetector, cmdTrigger } = require("./cmdHandler");
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

const player = new Player(client, {
    ytdlOptions: {
        requestOptions: {
            headers: {
                cookie: cookiesPath,
            },
        },
    },
});

client.once("ready", () => {
    registerPlayerEvents(player);
    cmdDetector(client);
    interDetector(client);
    console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
    await cmdTrigger(client, message, player);
});

client.on("interactionCreate", async (interaction) => {
    await interTrigger(client, interaction, player);
});

client.login(process.env.TOKEN);
