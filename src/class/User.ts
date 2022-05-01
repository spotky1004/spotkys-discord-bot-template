import App from "./App.js";
import Discord from "discord.js";

export interface UserData {
  id: string;
  isMod: boolean;
  isBanned: boolean;
}

class User {
  app: App;
  data: UserData;
  messageInteraction: Discord.CommandInteraction | null;
  lastActive: number;

  constructor(app: App, data: UserData) {
    this.app = app;
    this.data = data;
    this.messageInteraction = null;
    this.lastActive = new Date().getTime();
  }

  // @ts-ignore
  private async replyInteraction(interaction: Discord.CommandInteraction, messageOptions: Discord.MessageOptions | undefined) {
    if (this.messageInteraction !== null) {
      await this.messageInteraction.deleteReply().catch(e => e);
      this.messageInteraction = null;
    }
    if (typeof messageOptions === "undefined") return;
    await interaction.editReply(messageOptions)
      .then(_ => {
        // Set this.messageInteraction if reply was successful
        this.messageInteraction = interaction;
      })
      .catch(e => e);
  }

  // @ts-ignore
  private async editInteraction(interaction: Discord.CommandInteraction, messageOptions: Discord.MessageOptions | undefined) {
    await interaction.deferReply().catch(e => e);
    if (typeof messageOptions === "undefined") return;
    await interaction.editReply(messageOptions).catch(e => e);
  }
}

export default User;
