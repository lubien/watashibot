import dotenv from 'dotenv'

dotenv.config({ silent: true })

export const ENV = process.env.NODE_ENV || 'development'

export const TOKEN = process.env.TOKEN

export const PORT = process.env.PORT || 8000

export const HOST = process.env.HOST || '0.0.0.0'

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/watashibot'
