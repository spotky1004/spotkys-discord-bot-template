import deepcopy from "deepcopy";
import type App from "../core/App.js";
import type { default as Data, Savedata, OmitAutofilldSavedata } from "./Data.js";

export interface DataManagerConfig {
  cacheLifespan: number;
}

// @ts-ignore
export interface DataManagerOptions<T extends OmitAutofilldSavedata<Savedata>, D extends typeof Data> {
  app: App;
  defaultSaveData: T;
  config: DataManagerConfig;
  dataConstructor: D;
}

export default class DataManager<T extends OmitAutofilldSavedata<Savedata>, D extends typeof Data> {
  app: App;
  defaultSaveData: T;
  config: DataManagerConfig;
  dataConstructor: D;
  cache: { [key: string]: Data<T, DataManager<T, D>> };

  constructor(options: DataManagerOptions<T, D>) {
    this.app = options.app;
    this.defaultSaveData = { id: "", ...deepcopy(options.defaultSaveData) };
    this.dataConstructor = options.dataConstructor;
    this.config = options.config;
    this.cache = {};
  }

  getDocumentId(id: string) {
    return `d${id}`;
  }

  private async fetchData(id: string): Promise<Data<T, DataManager<T, D>>> {
    const saveDataWithID: { "id": string } & T = {
      ...this.defaultSaveData,
      id
    };
    const rawData = await this.app.saveManager.getDocumnet(
      this.getDocumentId(id),
      saveDataWithID
    );
    const data = new this.dataConstructor({
      app: this.app,
      dataManager: this,
      saveData: rawData
    });
    this.cache[id] = data;
    return data;
  }

  async getData(id: string) {
    if (this.cache.hasOwnProperty(id)) {
      return this.cache[id];
    } else {
      return await this.fetchData(id);
    }
  }

  async save(id: string) {
    const data = this.cache[id];
    if (!data) return false;
    let result = await this.app.saveManager.updateDocument(
      this.getDocumentId(id),
      data.saveData
    );
    if (new Date().getTime() - data.lastActive > this.config.cacheLifespan) {
      delete this.cache[id];
    }
    return result;
  }

  async saveAll() {
    for (const id in this.cache) {
      await this.save(id);
    }
  }
}
