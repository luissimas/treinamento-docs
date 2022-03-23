import { Router } from 'express'

import {
  createController,
  listController,
  getByIdController,
  updateController,
  deleteController,
} from '@controllers/user'

import { createValidation, deleteValidation, getByIdValidation, updateValidation } from '@middlewares/validation/user'

const router = Router()

router.post('/', createValidation(), createController)
router.get('/', listController)
router.get('/:id', getByIdValidation(), getByIdController)
router.patch('/:id', updateValidation(), updateController)
router.delete('/:id', deleteValidation(), deleteController)

export { router }
