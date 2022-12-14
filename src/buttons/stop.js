const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    queue.destroy();

    const embed = new EmbedBuilder()
        .setTitle(`Плеер остановлен!`)
        .setColor("#4188D2")
        .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });

    return interaction.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "stop",
    description: "",
};
