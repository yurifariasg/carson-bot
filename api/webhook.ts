import RedisSession from 'telegraf-session-redis'
import { NowRequest } from '@now/node'
import { NowResponse } from '@now/node'
import Telegraf from 'telegraf'
import {
  dinnerHandler,
  dinnerCallback,
} from './middlewares/dinner/dinnerMiddleware'
import { BotContext } from './types'

function getSecret(key: string): string {
  const secret = process.env[key.toUpperCase()]
  if (!secret) {
    throw new Error('Secret not found: ' + key)
  } else {
    return secret
  }
}

const TOKEN = getSecret('telegramtoken')
const bot = new Telegraf(TOKEN, { telegram: { webhookReply: true } })

const session = new RedisSession({
  store: {
    host: getSecret('redishostname'),
    port: 6379,
    password: getSecret('redispass'),
  },
  ttl: 86400,
})

bot.use(session.middleware())

bot.start(ctx => ctx.reply("I'm here"))
bot.command('dinner', dinnerHandler)

bot.action(/(.*?)/, dinnerCallback)

bot.catch((err: Error, ctx: BotContext) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.use(async (_ctx: BotContext, next: any) => {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log('Response time: %sms', ms)
})

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  await bot.handleUpdate(req.body, res)
}
