import mongoose, { Schema } from 'mongoose'

const StickerSchema = {
  stickerId: {
    type: String,
    index: true
  },

  userId: {
    type: Number,
    index: true
  },

  tags: [{
    type: String
  }],

  usage: {
    type: Number,
    default: 0
  },

  ref: Object
}

const Sticker = mongoose.model('Sticker', StickerSchema)

export default Sticker
