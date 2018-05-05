import session from 'telegraf/session'
import bot from "./bot"

import stage from './stage'
import inlineQuery from './inline-query'
import chosenInlineResult from './chosen-inline-results'

bot.use(session())
bot.use(stage.middleware())

bot.on('sticker', ctx => ctx.scene.enter('adding-sticker', {
  sticker: ctx.message.sticker
}))

bot.on('inline_query', inlineQuery)
bot.on('chosen_inline_result', chosenInlineResult)
