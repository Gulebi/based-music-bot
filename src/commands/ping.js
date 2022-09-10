module.exports.run = (client, message) => {
    message.reply("Pong!");
};

module.exports.data = {
    name: "ping",
    description: "",
    aliases: ["p"],
};
