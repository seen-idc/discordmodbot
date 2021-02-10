import { Message } from "discord.js";
import emojiRegex from 'emoji-regex'
import { request } from "http";


// Command for both bans and kicks
export function hardPunish(mode: 'BAN' | 'KICK', message: Message, args: Array<String>) {
  args.shift()

  if(!message.member?.hasPermission('KICK_MEMBERS') && mode == 'KICK') {
    message.channel.send('You have no permissions to do that')
    return
  }
  
  if(!message.member?.hasPermission('BAN_MEMBERS') && mode == 'BAN') {
    message.channel.send('You have no permissions to do that')
    return
  }

  let mentionMember = message.mentions.members?.first()

  if(!mentionMember) {
    return message.channel.send(`Mention member which you want to ${mode == 'BAN' ? 'ban' : 'kick'}`);
  }


  let authorHighestRole = message.member?.roles.highest.position
  let mentionHighestRole = mentionMember.roles.highest.position

  if (!authorHighestRole) return


  if(mentionHighestRole >= authorHighestRole) {
    message.channel.send(`You can\'t ${mode == 'BAN' ? 'ban' : 'kick'} members with equal or higher position`)
    return
  }

  if(!mentionMember.manageable) {
    message.channel.send(`I do not have the required permissions ${mode == 'BAN' ? 'ban' : 'kick'} this user`)
    return
  }

  let punishReason = args[0] ? args.join(' ') : 'No reason provided'

  mentionMember.send(`You were ${mode == 'BAN' ? 'banned' : 'kicked'} from **${message.guild?.name}**\nReason: \`${punishReason}\``).then(() => {
    
    if (mode == 'KICK') {
      mentionMember?.kick(punishReason)
      .then(() => {
        message.channel?.send(`**${mentionMember?.user.tag}** was kicked by ${message.member?.user.tag}\nReason: \`${punishReason}\``)
      }).catch(console.error)
    }
    else {
      mentionMember?.ban({
        reason: punishReason
      })
      .then(() => {
        message.channel?.send(`**${mentionMember?.user.tag}** was banned by ${message.member?.user.tag}\nReason: \`${punishReason}\``)
      }).catch(console.error)
    }
  })
}

// Text Filters

export function noGif(message: Message) {
  if (!message) return

  let containsGif = message.content.match(/(tenor\.|giphy\.)\w+/)
  if (containsGif) {
    message.channel.send(`${message.author.tag} sent a gif in chat`)
    message.delete().catch(console.error)
  }
}

export function noTextSpam(message: Message) {  
  if (!message) return

  if (message.tts == true) return

  if (message.content.length > 1000) {
    message.channel.send(`**${message.author.tag}** Please do not send excessively long messages`).then(() => {
      message.delete({
        reason: 'Spam'
      }).catch(console.error)
    }).catch(console.error)
  }
}

export function noEmojiSpam(message: Message) {
  if (!message) return

  let emojiCount = message.content.match(emojiRegex())?.length
  if (message.tts == true) return


  if (!emojiCount) return

  if (emojiCount > 10) {
    message.channel.send(`**${message.author.tag}** Please do not send messages with a lot of emojis`).then(() => {
      message.delete({
        reason: 'Spam'
      }).catch(console.error)
    }).catch(console.error)
  }
}

export function noAnnoyingTTS(message: Message) {
  if (!message) return
  
  if (message.content.length > 150) {
    message.channel.send(`**${message.author.tag}** Please do not send excessively long TTS messages`).then(() => {
      message.delete({
        reason: 'Too long for TTS'
      }).catch(console.error)
    }).catch(console.error)
  }

  let emojiCount = message.content.match(emojiRegex())?.length

  if (emojiCount) {
    message.channel.send(`**${message.author.tag}** Please do put emojis in your TTS messages`).then(() => {
      message.delete({
        reason: 'Too many emojis for TTS'
      }).catch(console.error)
    }).catch(console.error)
  }
}

