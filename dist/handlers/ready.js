import registerCommands from "../registerCommands.js";
export default async function readyHandler(options) {
    const { client, token, commonCommands, modCommands, app } = options;
    const guilds = await client.guilds.fetch();
    guilds.each(async (guild) => {
        const guildId = guild.id;
        const guildCache = await app.guildCaches.getGuild(guildId);
        let commandsToRegister = commonCommands;
        if (guildCache.data.isModServer) {
            commandsToRegister = commandsToRegister.concat(modCommands);
        }
        registerCommands({
            clientId: process.env.CLIENT_ID,
            guildId,
            commands: commandsToRegister,
            token
        });
        if (guildCache.data.connectedChannelId !== "-1") {
            const channel = await client.channels.fetch(guildCache.data.connectedChannelId);
            if (channel !== null && channel.type === "GUILD_TEXT") {
                guildCache.connectChannel(channel);
            }
        }
    });
}
