import express from 'express'
import { router } from '@routes'
import { setup } from './database'

// Loading dotenv config
import 'dotenv/config'

setup()

const app = express()

app.use(express.json())
app.use(router)

export { app }
