const { QueryType } = require("discord-player");

module.exports.run = async (client, message, args, player) => {
    const query = args.join(" ");

    const searchRes = await player.search(query, {
        requestedBy: message.user,
        searchEngine: QueryType.AUTO,
    });

    if (!searchRes || !searchRes.tracks.length) return message.reply(`Результатов не найдено!`);

    const queue = await player.createQueue(message.guild, {
        ytdlOptions: {
            filter: "audioonly",
            quality: "highestaudio",
            format: "mp3",
            highWaterMark: 1 << 30,
            dlChunkSize: 0,
        },
        metadata: message.channel,
        spotifyBridge: true,
        bufferingTimeout: 5000,
        initialVolume: 75,
        leaveOnEnd: false,
        leaveOnStop: false,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 60 * 1000 * 3,
    });

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guildId);
        return message.reply(`Не могу присоединиться к твоему голосовому каналу!`);
    }

    // await message.reply(`⏱ | Загружаю твой ${searchRes.playlist ? "плейлист" : "трек"}...`);
    searchRes.playlist ? queue.addTracks(searchRes.tracks) : queue.addTrack(searchRes.tracks[0]);
    if (!queue.playing) await queue.play();
};

module.exports.data = {
    name: "play",
    description: "",
    aliases: ["p"],
};
