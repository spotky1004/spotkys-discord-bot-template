import Guild from "./Guild.js";
class GuildCaches {
    constructor(app) {
        this.app = app;
        this.cache = {};
    }
    getConnectedChannels() {
        return Object.values(this.cache)
            .map(guild => guild.connectedChannel)
            .filter(channel => channel !== null);
    }
    async fetchGuild(id) {
        const guildData = await this.app.saveManager.loadGuild(id);
        const guild = new Guild(this.app, this, guildData);
        this.cache[id] = guild;
        return guild;
    }
    async getGuild(id) {
        if (this.cache.hasOwnProperty(id)) {
            return this.cache[id];
        }
        else {
            return await this.fetchGuild(id);
        }
    }
    async saveGuild(id) {
        return await this.app.saveManager.saveGuild(id, this.cache[id].data);
    }
    updateMessage(guild) {
        const message = guild.connectedMessage;
        if (message === null ||
            message.deleted) {
            return false;
        }
        message.edit("edit").catch(e => e);
        return true;
    }
}
export default GuildCaches;
