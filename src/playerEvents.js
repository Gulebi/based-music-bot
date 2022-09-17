const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports.registerPlayerEvents = (player) => {
    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });

    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
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
                      .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" })
                : new EmbedBuilder()
                      .setTitle("Сейчас играет")
                      .setColor("#4188D2")
                      .setDescription(`🎶 [\`${queue.current.title}\`](${queue.current.url})`)
                      .setThumbnail(queue.current.thumbnail)
                      .addFields(
                          { name: "Трек добавлен", value: `\`Someone\``, inline: true },
                          // { name: "Трек добавлен", value: queue.current.requestedBy.username, inline: true },
                          { name: "Автор трека", value: `\`${queue.current.author}\``, inline: true },
                          { name: "Длительность трека", value: `\`${queue.current.duration}\``, inline: true }
                      )
                      .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

        const backBtn = new ButtonBuilder().setLabel("Back").setCustomId("back").setStyle("Secondary").setEmoji("⏪");

        const loopBtn = new ButtonBuilder()
            .setLabel("Off")
            .setCustomId("loop")
            .setStyle("Secondary")
            .setEmoji("905067815780888666");

        const resumePauseBtn = new ButtonBuilder()
            .setLabel("Pause")
            .setCustomId("resume&pause")
            .setStyle("Secondary")
            .setEmoji("⏸️");

        const stopBtn = new ButtonBuilder().setLabel("Stop").setCustomId("stop").setStyle("Secondary").setEmoji("⏹️");

        const skipBtn = new ButtonBuilder().setLabel("Skip").setCustomId("skip").setStyle("Secondary").setEmoji("⏩");

        const row = new ActionRowBuilder().addComponents(backBtn, loopBtn, resumePauseBtn, stopBtn, skipBtn);

        queue.metadata.send({ embeds: [embed], components: [row] });
    });

    player.on("trackAdd", (queue, track) => {
        const embed = new EmbedBuilder()
            .setTitle("Трек добавлен в очередь")
            .setColor("#4188D2")
            .setDescription(`🎶 [\`${track.title}\`](${track.url})`)
            .addFields({ name: "Автор трека", value: `\`${track.author}\``, inline: true })
            .setThumbnail(track.thumbnail)
            .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

        queue.metadata.send({ embeds: [embed] });
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("Меня вручную отключили от голосового канала, очищаю очередь!");
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("В голосовом канале никого нет, ливаю...");
    });

    player.on("queueEnd", (queue) => {
        const embed = new EmbedBuilder()
            .setTitle("Очередь закончена")
            .setColor("#4188D2")
            .setDescription("Добавьте в очередь дольше песен")
            .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

        queue.metadata.send({ embeds: [embed] });
    });
};
