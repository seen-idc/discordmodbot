import { Client, Message, MessageEmbed } from "discord.js";
import { parseDisplayUptime, simpleEmbed } from "../lib";

export function run(client: Client, message: Message, args: Array<String>) {
  let uptime = parseDisplayUptime(process.uptime())
  let uptimeEmbed = simpleEmbed('green', '**Uptime**', `\`\`\`yaml\n${uptime[0]}\`\`\`\n\`\`\`css\n${uptime[1]}\`\`\``)
  message.channel.send(uptimeEmbed).catch(console.error)
}