module.exports.btnTrigger = async (client, interaction, player) => {
    const customId = interaction.customId;
    if (customId) {
        delete require.cache[require.resolve(`../src/buttons/${customId}.js`)];
        const button = require(`../src/buttons/${customId}.js`);
        if (button) return button(client, interaction, player, customId);
    }
};
