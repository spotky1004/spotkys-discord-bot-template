class Guild {
    constructor(app, guildCaches, data) {
        this.app = app;
        this.guildCaches = guildCaches;
        this.data = data;
        this.connectedChannel = null;
        this.connectedMessage = null;
    }
    async connectChannelWithInteraction(interaction) {
        var _a;
        if (!(interaction.inGuild() && interaction.guild && interaction.channel))
            return false;
        const author = await ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(interaction.user.id));
        const channel = interaction.channel;
        if (typeof author === "undefined") {
            await interaction.editReply({
                content: "An unknown error occurred while connecting..."
            });
            return true;
        }
        if (!(author === null || author === void 0 ? void 0 : author.permissions.has("MANAGE_CHANNELS"))) {
            await interaction.editReply({
                content: "MANAGE_CHANNELS permission is required to use this command!"
            });
            return true;
        }
        if (channel.type !== "GUILD_TEXT") {
            await interaction.editReply({
                content: "Channel must be Text channel!"
            });
            return true;
        }
        if (this.connectedChannel !== null &&
            this.connectedMessage !== null) {
            this.connectedMessage.delete().catch(e => e);
            this.connectedChannel.send("Disconnected").catch(e => e);
        }
        await this.connectChannel(channel);
        await interaction.editReply({
            content: "Done!"
        });
        this.app.logger.addLog("Connect", {
            userId: interaction.user.id,
            channelId: interaction.channelId,
            guildId: interaction.guildId,
        });
        return true;
    }
    async connectChannel(channel) {
        let errorOccured = false;
        await channel.messages.fetch({ limit: 5 })
            .then(channelMessages => {
            for (const [, message] of channelMessages) {
                if (message.author.id === process.env.CLIENT_ID) {
                    message.delete().catch(e => e);
                }
            }
        })
            .catch(_ => errorOccured = true);
        if (errorOccured)
            return;
        let wasSendMessageSuccess = false;
        const message = await channel.send("```\nLoading image...\n```")
            .then(message => {
            wasSendMessageSuccess = true;
            return message;
        })
            .catch(_ => wasSendMessageSuccess = false);
        if (!wasSendMessageSuccess)
            return;
        this.data.connectedChannelId = channel.id;
        this.connectedChannel = channel;
        this.connectedMessage = message;
        this.guildCaches.updateMessage(this);
    }
}
export default Guild;
