const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    if (!queue.previousTracks[1]) return interaction.reply({ content: "До этого в очереди не было треков!" });

    await queue.back();

    const embed = new EmbedBuilder()
        .setTitle(`Включаю предыдущий трек!`)
        .setColor("#4188D2")
        .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

    return interaction.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "back",
    description: "",
};
