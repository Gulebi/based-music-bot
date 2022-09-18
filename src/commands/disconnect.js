const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args, player) => {
    const queue = player.getQueue(message.guildId);

    if (!queue) return message.reply("Сейчас бот не в канале!");

    queue.destroy(true);

    const embed = new EmbedBuilder()
        .setTitle(`Плеер остановлен!`)
        .setColor("#4188D2")
        .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });

    queue.metadata.send({ embeds: [embed] });
};

module.exports.data = {
    name: "disconnect",
    description: "",
    aliases: ["dis"],
};
