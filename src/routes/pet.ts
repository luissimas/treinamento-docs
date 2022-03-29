import { Router } from 'express'

import {
  createController,
  listController,
  getByIdController,
  updateController,
  deleteController,
} from '@controllers/pet'

import { createValidation, deleteValidation, getByIdValidation, updateValidation } from '@middlewares/validation/pet'

const router = Router()

router.post('/', createValidation(), createController)
router.get('/', listController)
router.get('/:id', getByIdValidation(), getByIdController)
router.patch('/:id', updateValidation(), updateController)
router.delete('/:id', deleteValidation(), deleteController)

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       properties:
 *         id:
 *           type: string
 *         id_user:
 *           type: string
 *         name:
 *           type: string
 *         animal:
 *           type: string
 *         age:
 *           type: number
 */

export { router }
