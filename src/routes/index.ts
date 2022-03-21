import { Router } from 'express'
import { router as user } from '@routes/user'
import { router as pet } from '@routes/pet'

const router = Router()

router.use('/user', user)
router.use('/pet', pet)

export { router }
