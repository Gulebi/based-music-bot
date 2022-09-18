const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports.run = async (client, interaction, player, customId) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return interaction.reply("Сейчас музыка не играет!");

    let embed;

    if (queue.connection.paused) {
        const resumed = queue.setPaused(false);

        let newActionRowEmbeds = interaction.message.components.map((oldActionRow) => {
            updatedActionRow = new ActionRowBuilder();

            updatedActionRow.addComponents(
                oldActionRow.components.map((buttonComponent) => {
                    newButton = ButtonBuilder.from(buttonComponent);

                    if (interaction.component.customId == buttonComponent.customId) {
                        newButton.setEmoji("⏸️").setLabel("Pause");
                    }
                    return newButton;
                })
            );
            return updatedActionRow;
        });

        await interaction.update({ components: newActionRowEmbeds });

        embed = resumed
            ? new EmbedBuilder()
                  .setTitle("Плеер возобновлен!")
                  .setColor("#4188D2")
                  .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" })
            : new EmbedBuilder()
                  .setTitle("Что-то пошло не так!")
                  .setColor("#ad0000")
                  .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });
    } else {
        const paused = queue.setPaused(true);

        let newActionRowEmbeds = interaction.message.components.map((oldActionRow) => {
            updatedActionRow = new ActionRowBuilder();

            updatedActionRow.addComponents(
                oldActionRow.components.map((buttonComponent) => {
                    newButton = ButtonBuilder.from(buttonComponent);

                    if (interaction.component.customId == buttonComponent.customId) {
                        newButton.setEmoji("▶️").setLabel("Resume");
                    }
                    return newButton;
                })
            );
            return updatedActionRow;
        });

        await interaction.update({ components: newActionRowEmbeds });

        embed = paused
            ? new EmbedBuilder()
                  .setTitle("Плеер приостановлен!")
                  .setColor("#4188D2")
                  .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" })
            : new EmbedBuilder()
                  .setTitle("Что-то пошло не так!")
                  .setColor("#ad0000")
                  .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" });
    }

    // return interaction.message.reply({ embeds: [embed] });
};

module.exports.data = {
    name: "resume&pause",
    description: "",
};
