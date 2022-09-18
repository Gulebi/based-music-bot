const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args, player) => {
    const queue = player.getQueue(message.guildId);

    if (!queue || !queue.playing) return message.reply("Сейчас музыка не играет!");

    const songs = queue.tracks.length;

    const lastChar = songs.toString().charAt(songs.length - 1);

    const correctWriting = lastChar == 1 ? "песня" : lastChar > 1 && lastChar < 5 ? "песни" : "песен";

    const nextSongs =
        songs > 5 ? `И ещё **${songs - 5}** ${correctWriting}...` : `Далее в очереди **${songs}** ${correctWriting}...`;

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author}`);

    const queueSongs = songs != 0 ? `\nСледующие:\n${tracks.slice(0, 5).join("\n")}\n\n` : "\n";

    const embed = new EmbedBuilder()
        .setTitle("Очередь")
        .setColor("#4188D2")
        .setDescription(`Сейчас играет: ${queue.current.title} | ${queue.current.author}\n${queueSongs}${nextSongs}`)
        .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });

    queue.metadata.send({ embeds: [embed] });
};

module.exports.data = {
    name: "queue",
    description: "",
    aliases: ["q"],
};
