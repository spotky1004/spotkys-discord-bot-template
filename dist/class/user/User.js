class User {
    constructor(app, data) {
        this.app = app;
        this.data = data;
        this.messageInteraction = null;
        this.lastActive = new Date().getTime();
    }
    // @ts-ignore
    async replyInteraction(interaction, messageOptions) {
        if (this.messageInteraction !== null) {
            await this.messageInteraction.deleteReply().catch(e => e);
            this.messageInteraction = null;
        }
        if (typeof messageOptions === "undefined")
            return;
        await interaction.editReply(messageOptions)
            .then(_ => {
            // Set this.messageInteraction if reply was successful
            this.messageInteraction = interaction;
        })
            .catch(e => e);
    }
    // @ts-ignore
    async editInteraction(interaction, messageOptions) {
        await interaction.deferReply().catch(e => e);
        if (typeof messageOptions === "undefined")
            return;
        await interaction.editReply(messageOptions).catch(e => e);
    }
}
export default User;
