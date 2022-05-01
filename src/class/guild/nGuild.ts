import Data, { DataOptions, Savedata, OmitAutofilldSavedata } from "../util/Data.js";
import type GuildManager from "./nGuildManager.js";

export interface GuildData extends OmitAutofilldSavedata<Savedata> {
  /** "-1" means connected channel doesn't exists */
  connectedChannelId: string;
  isModServer: boolean;
}
export const defaultGuildData: GuildData = {
  connectedChannelId: "-1",
  isModServer: false
};
export interface GuildDataOptions extends DataOptions<GuildData, typeof GuildManager, typeof Guild> {
  
}

export default class Guild extends Data<GuildData, typeof GuildManager, typeof Guild> {
  constructor(data: GuildData) {
    super(data);
  }
}
