import DataManager from "../util/DataManager";
import Guild from "./nGuild.js";
export default class GuildManager extends DataManager {
    constructor(app, config) {
        super({
            app,
            config,
            dataConstructor: Guild,
            defaultSaveData: defaultGuildData
        });
    }
}
