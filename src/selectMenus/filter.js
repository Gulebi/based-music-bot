const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    let filterName = interaction.values[0];

    let filterEnabled = true;

    if (filterName == "clear") {
        filterEnabled = false;
        filterName = queue.getFiltersEnabled()[0];
        await queue.setFilters({ [filterName]: filterEnabled });
    } else {
        await queue.setFilters({ [filterName]: filterEnabled });
    }

    let embed;

    if (queue.getFiltersEnabled()[0] == filterName) {
        embed = new EmbedBuilder()
            .setTitle(`Эффект ${filterName} применён!`)
            .setColor("#4188D2")
            .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });
    } else if (queue.getFiltersEnabled()[0] == undefined) {
        embed = new EmbedBuilder()
            .setTitle(`Эффект ${filterName} отменён!`)
            .setColor("#4188D2")
            .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });
    } else {
        embed = new EmbedBuilder()
            .setTitle("Что-то пошло не так!")
            .setColor("#ad0000")
            .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });
    }

    return interaction.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "filter",
    description: "",
};
