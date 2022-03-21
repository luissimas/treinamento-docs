import express from 'express'
import { router } from '@routes'
import { setup } from './database'
import { handler } from '@middlewares/error'

// Loading dotenv config
import 'dotenv/config'

// Setting up database
setup()

const app = express()

app.use(express.json())
app.use(router)

// Custom error handler
app.use(handler)

export { app }
