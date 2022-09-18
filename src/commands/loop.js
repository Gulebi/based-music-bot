const { QueueRepeatMode } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args, player) => {
    const queue = player.getQueue(message.guildId);

    if (!queue || !queue.playing) return message.reply("Music is not playing!");

    const methods = ["Выключен", "Трек", "Очередь"];

    let loopMode = queue.repeatMode;
    let looped;

    if (loopMode === 0) looped = queue.setRepeatMode(QueueRepeatMode.TRACK);
    if (loopMode === 1) looped = queue.setRepeatMode(QueueRepeatMode.QUEUE);
    if (loopMode === 2) looped = queue.setRepeatMode(QueueRepeatMode.OFF);

    const embed = looped
        ? new EmbedBuilder()
              .setTitle(`Режим повтора изменён на | ${methods[queue.repeatMode]}`)
              .setColor("#4188D2")
              .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" })
        : new EmbedBuilder()
              .setTitle("Что-то пошло не так!")
              .setColor("#ad0000")
              .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });

    queue.metadata.send({ embeds: [embed] });
};

module.exports.data = {
    name: "loop",
    description: "",
    aliases: ["l"],
};
