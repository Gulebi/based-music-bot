const { Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports.interDetector = async (client) => {
    client.buttons = new Collection();
    client.selectMenus = new Collection();

    const btnPath = path.join(__dirname, "buttons");
    const menuPath = path.join(__dirname, "selectMenus");

    fs.readdirSync(btnPath)
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
            const filePath = path.join(btnPath, file);
            const button = require(filePath);
            client.buttons.set(button.data.name, button);
        });
    console.log(`${client.buttons.size} buttons loaded!`);

    fs.readdirSync(menuPath)
        .filter((file) => file.endsWith(".js"))
        .forEach((file) => {
            const filePath = path.join(menuPath, file);
            const menu = require(filePath);
            client.selectMenus.set(menu.data.name, menu);
        });
    console.log(`${client.selectMenus.size} select menus loaded!`);
};

module.exports.interTrigger = async (client, interaction, player) => {
    if (interaction.isButton()) {
        const customId = interaction.customId;
        if (customId) {
            let button = client.buttons.get(customId);
            try {
                if (button) return button.run(client, interaction, player, customId);
            } catch (error) {
                console.error(error);
                await interaction.reply("There was an error while executing this interaction!");
            }
        }
    } else if (interaction.isSelectMenu()) {
        const customId = interaction.customId;
        if (customId) {
            let menu = client.selectMenus.get(customId);
            try {
                if (menu) return menu.run(client, interaction, player, customId);
            } catch (error) {
                console.error(error);
                await interaction.reply("There was an error while executing this interaction!");
            }
        }
    }
};
