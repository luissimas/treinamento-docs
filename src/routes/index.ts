import { Router } from 'express'
import { router as user } from '@routes/user'
import { router as pet } from '@routes/pet'
import { router as docs } from '@routes/docs'

const router = Router()

router.use('/user', user)
router.use('/pet', pet)
router.use('/docs', docs)

export { router }
