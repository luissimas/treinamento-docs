import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { version } from '../../package.json'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Pets',
      version,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

const spec = swaggerJsdoc(options)

const router = Router()

router.use('/', swaggerUi.serve, swaggerUi.setup(spec))

export { router }
