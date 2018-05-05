import Telegraf from 'telegraf'
import mongoose from 'mongoose'
import { TOKEN, MONGO_URL } from './config'

mongoose.connect(MONGO_URL)

const bot = new Telegraf(TOKEN)

bot.startPolling()

export default bot
