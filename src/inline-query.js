import Sticker from './models/Sticker'

export default async function chosenInlineResult(ctx) {
  const condition = {
    userId: ctx.from.id,
    tags: ctx.inlineQuery.query && new RegExp(ctx.inlineQuery.query)
  }

  const stickers = await Sticker.find(condition)
    .sort({ usage: 'desc' })

  ctx.answerInlineQuery(
    stickers.map(({ ref: { file_id } }) => ({
      type: 'sticker',
      id: file_id,
      sticker_file_id: file_id
    }))
  )
}
