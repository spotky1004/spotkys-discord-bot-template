import type App from "../core/App.js";
import type DataManager from "./DataManager.js";

export type OmitAutofilldSavedata<T extends Savedata> = Omit<T, "id">;
interface AutofilledSavedatas {
  id: string;
}
export interface Savedata extends AutofilledSavedatas {
}
export interface DataOptions<T extends Savedata, D extends DataManager<OmitAutofilldSavedata<T>, typeof Data>> {
  app: App;
  dataManager: D;
  saveData: T;
}

export default class Data<T extends Savedata, D extends DataManager<OmitAutofilldSavedata<T>, typeof Data>> {
  app: App;
  dataManager: D;
  saveData: T;
  lastActive: number;

  constructor(options: DataOptions<AutofilledSavedatas & T, D>) {
    this.app = options.app;
    this.dataManager = options.dataManager;
    this.saveData = options.saveData;
    this.lastActive = new Date().getTime();
  }
}
