const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    const skipped = queue.skip();

    const embed = skipped
        ? new EmbedBuilder()
              .setTitle(`Скипнул ${queue.current.title} | ${queue.current.author}!`)
              .setColor("#4188D2")
              .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" })
        : new EmbedBuilder()
              .setTitle("Что-то пошло не так!")
              .setColor("#ad0000")
              .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });

    return interaction.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "skip",
    description: "",
};
