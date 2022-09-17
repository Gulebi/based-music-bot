const { QueueRepeatMode } = require("discord-player");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports.run = async (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    const methods = ["Выключен", "Трек", "Очередь"];

    let loopMode = queue.repeatMode;
    let looped;

    if (loopMode == 0) {
        looped = queue.setRepeatMode(QueueRepeatMode.TRACK);

        let newActionRowEmbeds = interaction.message.components.map((oldActionRow) => {
            updatedActionRow = new ActionRowBuilder();

            updatedActionRow.addComponents(
                oldActionRow.components.map((buttonComponent) => {
                    newButton = ButtonBuilder.from(buttonComponent);

                    if (interaction.component.customId == buttonComponent.customId) {
                        newButton.setEmoji("🔂").setLabel("Track");
                    }
                    return newButton;
                })
            );
            return updatedActionRow;
        });

        await interaction.update({ components: newActionRowEmbeds });
    } else if (loopMode == 1) {
        looped = queue.setRepeatMode(QueueRepeatMode.QUEUE);

        let newActionRowEmbeds = interaction.message.components.map((oldActionRow) => {
            updatedActionRow = new ActionRowBuilder();

            updatedActionRow.addComponents(
                oldActionRow.components.map((buttonComponent) => {
                    newButton = ButtonBuilder.from(buttonComponent);

                    if (interaction.component.customId == buttonComponent.customId) {
                        newButton.setEmoji("🔁").setLabel("Queue");
                    }
                    return newButton;
                })
            );
            return updatedActionRow;
        });

        await interaction.update({ components: newActionRowEmbeds });
    } else if (loopMode == 2) {
        looped = queue.setRepeatMode(QueueRepeatMode.OFF);

        let newActionRowEmbeds = interaction.message.components.map((oldActionRow) => {
            updatedActionRow = new ActionRowBuilder();

            updatedActionRow.addComponents(
                oldActionRow.components.map((buttonComponent) => {
                    newButton = ButtonBuilder.from(buttonComponent);

                    if (interaction.component.customId == buttonComponent.customId) {
                        newButton.setEmoji("🔁").setLabel("None");
                    }
                    return newButton;
                })
            );
            return updatedActionRow;
        });

        await interaction.update({ components: newActionRowEmbeds });
    }

    const embed = looped
        ? new EmbedBuilder()
              .setTitle(`Режим повтора изменён на | ${methods[queue.repeatMode]}`)
              .setColor("#4188D2")
              .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" })
        : new EmbedBuilder()
              .setTitle("Что-то пошло не так!")
              .setColor("#ad0000")
              .setFooter({ text: "Based Music Bot", iconURL: "https://i.imgur.com/0PCQtit.png" });

    // return interaction.message.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "loop",
    description: "",
};
