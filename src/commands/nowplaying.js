const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args, player) => {
    const queue = player.getQueue(message.guildId);

    if (!queue || !queue.playing) return message.reply("Сейчас музыка не играет!");

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    const source = queue.current.source;

    const embed =
        source == "spotify"
            ? new EmbedBuilder()
                  .setTitle("Сейчас играет")
                  .setColor("#4188D2")
                  .setDescription(`🎶 [\`${queue.current.title}\`](${queue.current.url})`)
                  .addFields(
                      { name: "Трек добавлен", value: `\`Someone\``, inline: true },
                      // { name: "Трек добавлен", value: queue.current.requestedBy.username, inline: true },
                      { name: "Автор трека", value: `\`${queue.current.author}\``, inline: true },
                      { name: "Длительность трека", value: `\`Unknown\``, inline: true }
                      //   { name: "Длительность трека", value: `\`${queue.current.duration}\``, inline: true }
                  )
                  .setThumbnail(queue.current.thumbnail)
                  .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" })
            : new EmbedBuilder()
                  .setTitle("Сейчас играет")
                  .setColor("#4188D2")
                  .setDescription(
                      `🎶 [\`${queue.current.title}\`](${queue.current.url}) (\`${
                          perc.progress == "Infinity" ? "Live" : perc.progress + "%"
                      }\`)`
                  )
                  .addFields(
                      { name: "Трек добавлен", value: `\`Someone\``, inline: true },
                      // { name: "Трек добавлен", value: queue.current.requestedBy.username, inline: true },
                      { name: "Автор трека", value: `\`${queue.current.author}\``, inline: true },
                      { name: "Длительность трека", value: `\`${queue.current.duration}\``, inline: true },
                      { name: "\u200b", value: progress.replace(/ 0:00/g, " ◉ LIVE") }
                  )
                  .setThumbnail(queue.current.thumbnail)
                  .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });

    queue.metadata.send({ embeds: [embed] });
};

module.exports.data = {
    name: "nowplaying",
    description: "",
    aliases: ["np"],
};
