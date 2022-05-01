import UserCaches from "../user/UserCaches.js";
import GuildCaches from "../guild/GuildCaches.js";
import SaveManager, { Collection } from "./SaveManager.js";
import Logger from "./Logger.js";

interface AppConfig {
  
}
interface AppOptions {
  config: AppConfig;
  collections: {
    data: Collection;
    log: Collection;
  };
}

class App {
  config: AppConfig;
  userCaches: UserCaches;
  guildCaches: GuildCaches;
  saveManager: SaveManager;
  logger: Logger;
  saving: boolean;

  constructor(options: AppOptions) {
    this.config = options.config;
    this.userCaches = new UserCaches(this, { cacheCleanupTimeout: 100_000 });
    this.guildCaches = new GuildCaches(this);
    this.saveManager = new SaveManager(this, options.collections.data);
    this.logger = new Logger(this, options.collections.log);

    this.saving = false;

    this.init();
  }
  
  async init() {
    // init
    return true;
  }

  async save() {
    if (this.saving) return;
    this.saving = true;

    await this.userCaches.cleanupCache();
    for (const id in this.userCaches.cache) {
      await this.userCaches.saveUser(id);
    }
    for (const id in this.guildCaches.cache) {
      await this.guildCaches.saveGuild(id);
    }
    await this.logger.save();

    this.saving = false;
  }
}

export default App;
