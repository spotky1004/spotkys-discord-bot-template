import deepcopy from "deepcopy";
import App from "./App.js";
import type mongodb from "mongodb";
import type { UserData } from "./User.js";
import type { GuildData } from "./Guild.js";

export type Collection = mongodb.Collection<mongodb.Document>;

const getUserDocumentId = (id: string) => `u_${id}`;
const getGuildDocumentId = (id: string) => `g_${id}`;

class SaveManager {
  app: App;
  collection: Collection;

  constructor(app: App, collection: Collection) {
    this.app = app;
    this.collection = collection;
  }

  private async getDocumnet<T extends object>(id: string, defaultData: T) {
    const gotDocument = await this.collection.findOne({ _id: id });
    let data = deepcopy(defaultData);
    if (gotDocument !== null) {
      const gotDocumnetWithoutId: Omit<typeof gotDocument, "_id"> = gotDocument;
      delete gotDocumnetWithoutId.id;
      data = {...data, ...gotDocumnetWithoutId};
    }
    return data;
  }

  private async updateDocument(id: string, data: {[key: string]: any}) {
    const result = await this.collection.updateOne(
      { _id: id },
      { $set: data },
      { upsert: true }
    );
    return result.acknowledged;
  }

  async banUser(id: string) {
    delete this.app.userCaches.cache[id];
    const userData = await this.loadUser(id);
    if (userData.isMod) return false;

    userData.isBanned = true;
    this.saveUser(id, userData);
    return true;
  }

  async unbanUser(id: string) {
    delete this.app.userCaches.cache[id];
    const userData = await this.loadUser(id);
    userData.isBanned = false;
    this.saveUser(id, userData);
    return true;
  }

  async loadUser(id: string) {
    const defaultData: UserData = {
      id,
      isBanned: false,
      isMod: false,
    };
    return await this.getDocumnet(getUserDocumentId(id), defaultData);
  }

  async saveUser(id: string, data: UserData) {
    return await this.updateDocument(getUserDocumentId(id), data);
  }

  async loadGuild(id: string) {
    const defaultData: GuildData = {
      id,
      connectedChannelId: "-1",
      isModServer: false,
    };
    return await this.getDocumnet(getGuildDocumentId(id), defaultData);
  }

  async saveGuild(id: string, data: GuildData) {
    return await this.updateDocument(getGuildDocumentId(id), data);
  }
}

export default SaveManager;
