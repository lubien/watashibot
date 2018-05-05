import Scene from 'telegraf/scenes/base'
import Composer from 'telegraf/composer'
import WizardScene from 'telegraf/scenes/wizard'
const Markup = require('telegraf/markup')
import Sticker from '../models/Sticker'

// Step 1
function askTags (ctx) {
  ctx.reply('Send me different tags separated by comma:')
  return ctx.wizard.next()
}

// Step 2
const confirmTags = new Composer()

confirmTags.on('message', ctx => {
  const { text } = ctx.message

  if (!text) return ctx.scene.reenter()

  const tags = text
    .split(',')
    .map(tag => tag.trim())
    // Remove blanks and duplicates
    .filter((x, i, xs) => x && xs.indexOf(x) === i)

  ctx.scene.state.tags = tags

  ctx.reply(`Confirm tags: ${tags.join(', ')}`, Markup.inlineKeyboard([
    Markup.callbackButton('⬅️ Redo', 'redo'),
    Markup.callbackButton('➡️ Next', 'next')
  ]).extra())
})
confirmTags.action('next', ctx => ctx.wizard.next() )
confirmTags.action('redo', ctx => ctx.scene.reenter() )
confirmTags.use(ctx => ctx.replyWithMarkdown('Press any button'))

// Step 3
async function addSticker (ctx) {
  const { sticker, tags } = ctx.scene.state
  const inserted = await insertNewSticker(ctx.from.id, sticker, tags)
  ctx.reply('Sticker added')
  return ctx.scene.leave()
}

const addingStickerScene = new WizardScene('adding-sticker',
  askTags,
  confirmTags,
  addSticker
)

function insertNewSticker(userId, sticker, tags) {
  const condition = {
    stickerId: sticker.file_id,
    userId
  }

  const update = {
    ref: sticker,
    tags
  }

  const options = {
    upsert: true,
    new: true
  }

  return Sticker.findOneAndUpdate(condition, update, options)
}

export default addingStickerScene
