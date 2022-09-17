const { AudioFilters } = require("discord-player");

const { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder } = require("discord.js");

module.exports.run = async (client, message, args, player) => {
    const queue = player.getQueue(message.guildId);

    if (!queue || !queue.playing) return message.reply("Сейчас музыка не играет!");

    const filtersList = [
        { label: "Clear", value: "clear" },
        { label: "8D", value: "8D" },
        { label: "Bassboost", value: "bassboost" },
        { label: "Earrape", value: "earrape" },
        { label: "Haas", value: "haas" },
        { label: "Karaoke", value: "karaoke" },
        { label: "Nightcore", value: "nightcore" },
        { label: "Reverse", value: "reverse" },
        { label: "Vaporwave", value: "vaporwave" },
    ];

    const embed = new EmbedBuilder()
        .setTitle("Выбери эффект")
        .setColor("#4188D2")
        .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

    const selectMenu = new SelectMenuBuilder()
        .setCustomId("filter")
        .setPlaceholder("Nothing selected")
        .addOptions(...filtersList);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    queue.metadata.send({ embeds: [embed], components: [row] });
};

module.exports.data = {
    name: "filter",
    description: "",
    aliases: ["f"],
};
