export interface ConnectLogSchema {
  type?: "Connect";
  time?: number;
  userId: string;
  guildId: string;
  channelId: string;
}
export interface BanLogSchema {
  type?: "Ban";
  time?: number;
  authorId: string;
  userId: string;
  guildId: string;
}
export interface UnbanLogSchema {
  type?: "Unban";
  time?: number;
  authorId: string;
  userId: string;
  guildId: string;
}

export interface LogSchemas {
  "Connect": ConnectLogSchema;
  "Ban": BanLogSchema;
  "Unban": UnbanLogSchema;
}
export type AnyLogSchema = LogSchemas[keyof LogSchemas];