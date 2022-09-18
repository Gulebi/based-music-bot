const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const mongo = require("../mongo");
const setPrefixCmdSchema = require("../schemas/setPrefixCmdSchema");

const { updateCache } = require("../cmdHandler");

module.exports.run = async (client, message, args, player) => {
    if (message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        await mongo().then(async (mongoose) => {
            try {
                const guildId = message.guild.id;
                const prefix = args.toString();

                await setPrefixCmdSchema.findByIdAndUpdate(
                    {
                        _id: guildId,
                    },
                    {
                        _id: guildId,
                        prefix: prefix,
                    },
                    {
                        upsert: true,
                    }
                );

                message.reply(`Префикс был изменён на ${prefix}`);

                updateCache(guildId, prefix);
            } finally {
                mongoose.connection.close();
            }
        });
    } else {
        message.reply(`${message.author.username}, вы не имеете прав на эту команду!`);
    }
};

module.exports.data = {
    name: "setprefix",
    description: "",
    aliases: ["sp"],
};
