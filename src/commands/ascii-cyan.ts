import { Client, Message } from "discord.js";
import figlet from "figlet";

export function run(client: Client, message: Message, args: Array<string>) {

  let text = args.join(' ')
  
  figlet(text, (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    
    message.channel.send(`\`\`\`yaml\n${data}\n\`\`\``)
  })
}