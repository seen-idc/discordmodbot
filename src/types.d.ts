import { Client } from "discord.js";

export interface Command {
  run: runCommand
}

export type runCommand = (client: Client, message: Message, args: Array<string>) => void

export interface Config {
  prefix: string,
  token: string,
}

export interface Commands {
  [key: string]: Command
}

export interface voiceCount {
  [key: string]: number
}


export interface commandProps {
  name: string,
  value: string,
}

export type presetColor = 'red' | 'green' | 'blue' | 'gold' | 'pigeon' | 'RANDOM' | 'BLURPLE'

export interface cache {
  [key: string]: any
}

export interface cooldownCache {
  [key: string]: boolean
}