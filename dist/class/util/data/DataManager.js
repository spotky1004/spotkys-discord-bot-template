import Data from "./Data.js";
import deepcopy from "deepcopy";
export default class DataManager {
    constructor(app, defaultSaveData, config) {
        this.app = app;
        this.defaultSaveData = deepcopy(defaultSaveData);
        this.config = config;
        this.cache = {};
    }
    getDocumentId(id) {
        return `d${id}`;
    }
    async fetchData(id) {
        const rawData = await this.app.saveManager.getDocumnet(this.getDocumentId(id), this.defaultSaveData);
        const data = new Data(this.app, this, rawData);
        this.cache[id] = data;
        return data;
    }
    async getData(id) {
        if (this.cache.hasOwnProperty(id)) {
            return this.cache[id];
        }
        else {
            return await this.fetchData(id);
        }
    }
    async save(id) {
        const data = this.cache[id];
        if (!data)
            return false;
        let result = await this.app.saveManager.updateDocument(this.getDocumentId(id), data.saveData);
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
