import deepcopy from "deepcopy";
const getUserDocumentId = (id) => `u_${id}`;
const getGuildDocumentId = (id) => `g_${id}`;
class SaveManager {
    constructor(app, collection) {
        this.app = app;
        this.collection = collection;
    }
    async getDocumnet(id, defaultData) {
        const gotDocument = await this.collection.findOne({ _id: id });
        let data = deepcopy(defaultData);
        if (gotDocument !== null) {
            const gotDocumnetWithoutId = gotDocument;
            delete gotDocumnetWithoutId.id;
            data = Object.assign(Object.assign({}, data), gotDocumnetWithoutId);
        }
        return data;
    }
    async updateDocument(id, data) {
        const result = await this.collection.updateOne({ _id: id }, { $set: data }, { upsert: true });
        return result.acknowledged;
    }
    async banUser(id) {
        delete this.app.userCaches.cache[id];
        const userData = await this.loadUser(id);
        if (userData.isMod)
            return false;
        userData.isBanned = true;
        this.saveUser(id, userData);
        return true;
    }
    async unbanUser(id) {
        delete this.app.userCaches.cache[id];
        const userData = await this.loadUser(id);
        userData.isBanned = false;
        this.saveUser(id, userData);
        return true;
    }
    async loadUser(id) {
        const defaultData = {
            id,
            isBanned: false,
            isMod: false,
        };
        return await this.getDocumnet(getUserDocumentId(id), defaultData);
    }
    async saveUser(id, data) {
        return await this.updateDocument(getUserDocumentId(id), data);
    }
    async loadGuild(id) {
        const defaultData = {
            id,
            connectedChannelId: "-1",
            isModServer: false,
        };
        return await this.getDocumnet(getGuildDocumentId(id), defaultData);
    }
    async saveGuild(id, data) {
        return await this.updateDocument(getGuildDocumentId(id), data);
    }
}
export default SaveManager;
