import deepcopy from "deepcopy";
export default class DataManager {
    constructor(options) {
        this.app = options.app;
        this.defaultSaveData = Object.assign({ id: "" }, deepcopy(options.defaultSaveData));
        this.dataConstructor = options.dataConstructor;
        this.config = options.config;
        this.cache = {};
    }
    getDocumentId(id) {
        return `d${id}`;
    }
    async fetchData(id) {
        const saveDataWithID = Object.assign(Object.assign({}, this.defaultSaveData), { id });
        const rawData = await this.app.saveManager.getDocumnet(this.getDocumentId(id), saveDataWithID);
        const data = new this.dataConstructor({
            app: this.app,
            dataManager: this,
            saveData: rawData
        });
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
