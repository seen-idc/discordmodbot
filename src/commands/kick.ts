import { Client, Message } from "discord.js";
import { hardPunish } from "../lib";

export function run(client: Client, message: Message, args: Array<String>) {
  hardPunish('KICK', message, args)
}