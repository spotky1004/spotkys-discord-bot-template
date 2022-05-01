import DataManager, { DataManagerConfig } from "../util/DataManager";
import Guild, { GuildData } from "./nGuild.js";
import type App from "../core/App.js";

export interface GuildDataConfig extends DataManagerConfig {
}

export default class GuildManager extends DataManager<GuildData, typeof Guild> {
  constructor(app: App, config: GuildDataConfig) {
    super({
      app,
      config,
      dataConstructor: Guild,
      defaultSaveData: defaultGuildData
    });
  }
}
