import Guild from "./Guild.js";
import Discord from "discord.js";
import type App from "./App.js";

class GuildCaches {
  app: App;
  cache: {[id: string]: Guild};

  constructor(app: App) {
    this.app = app;
    this.cache = {};
  }

  getConnectedChannels() {
    return Object.values(this.cache)
      .map(guild => guild.connectedChannel)
      .filter(channel => channel !== null) as Discord.TextChannel[];
  }

  private async fetchGuild(id: string) {
    const guildData = await this.app.saveManager.loadGuild(id);
    const guild = new Guild(this.app, this, guildData);
    this.cache[id] = guild;
    return guild;
  }

  async getGuild(id: string) {
    if (this.cache.hasOwnProperty(id)) {
      return this.cache[id];
    } else {
      return await this.fetchGuild(id);
    }
  }

  async saveGuild(id: string) {
    return await this.app.saveManager.saveGuild(id, this.cache[id].data);
  }

  updateMessage(guild: Guild) {
    const message = guild.connectedMessage;
    if (
      message === null ||
      message.deleted
    ) {
      return false;
    }

    message.edit("edit").catch(e => e);
    return true;
  }
}

export default GuildCaches;
