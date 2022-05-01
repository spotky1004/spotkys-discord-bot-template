export default class Data {
    constructor(app, dataManager, saveData) {
        this.app = app;
        this.dataManager = dataManager;
        this.saveData = saveData;
        this.lastActive = new Date().getTime();
    }
}
