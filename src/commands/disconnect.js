const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args, player) => {
    const queue = player.getQueue(message.guildId);

    if (!queue || !queue.playing) return message.reply("Music is not playing!");

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

    queue.metadata.send({ embeds: [embed] });
};

module.exports.data = {
    name: "disconnect",
    description: "",
    aliases: ["dis"],
};
