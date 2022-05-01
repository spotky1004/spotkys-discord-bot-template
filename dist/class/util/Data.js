export default class Data {
    constructor(options) {
        this.app = options.app;
        this.dataManager = options.dataManager;
        this.saveData = options.saveData;
        this.lastActive = new Date().getTime();
    }
}
