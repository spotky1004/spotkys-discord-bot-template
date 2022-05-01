import Data from "../util/Data.js";
export const defaultGuildData = {
    connectedChannelId: "-1",
    isModServer: false
};
export default class Guild extends Data {
    constructor(data) {
        super(data);
    }
}
