import Sticker from './models/Sticker'

export default async function inlineQuery(ctx) {
  const condition = {
    stickerId: ctx.chosenInlineResult.result_id,
    userId: ctx.from.id
  }

  const update = {
    $inc: { usage: 1 }
  }
  
  Sticker.findOneAndUpdate(condition, update).then(() => {})
}
