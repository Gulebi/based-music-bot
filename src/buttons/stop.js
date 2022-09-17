const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    const disconnected = queue.destroy(true);

    const embed = disconnected
        ? new EmbedBuilder()
              .setTitle(`Плеер остановлен!`)
              .setColor("#4188D2")
              .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" })
        : new EmbedBuilder()
              .setTitle("Что-то пошло не так!")
              .setColor("#ad0000")
              .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

    return interaction.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "stop",
    description: "",
};
