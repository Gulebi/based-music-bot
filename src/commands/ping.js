const { EmbedBuilder } = require("discord.js");

module.exports.run = (client, message, args, player) => {
    const queue = player.getQueue(message.guild);

    const embed = new EmbedBuilder()
        .setColor("#4188D2")
        .setTitle("Pong!")
        .addFields(
            { name: "Задержка бота:", value: `\`${Math.round(client.ws.ping)}ms\`` },
            {
                name: "Задержка войса:",
                value: !queue
                    ? "`N/A`"
                    : `UDP: \`${queue.connection.voiceConnection.ping.udp ?? "`N/A`"}\`ms\n
                    WebSocket: \`${queue.connection.voiceConnection.ping.ws ?? "`N/A`"}\`ms`,
            }
        );

    message.channel.send({ embeds: [embed] });
};

module.exports.data = {
    name: "ping",
    description: "",
    aliases: ["ping"],
};
