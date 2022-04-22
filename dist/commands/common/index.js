import getPath from "../../util/getPath.js";
import readModules from "../../util/readModules.js";
const commandNameEnum = {
    "connectchannel": 0,
};
const { __dirname } = getPath(import.meta.url);
const commandDatas = readModules({
    dirname: __dirname,
    ignore: ["index.js"]
});
export default commandDatas;
// export { default as connectchannel } from "./connectchannel.js";
