import { ContextMessageUpdate } from 'telegraf'

export interface BotContext extends ContextMessageUpdate {
  session: Record<string, any>
}
