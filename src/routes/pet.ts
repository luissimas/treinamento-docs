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

/**
 * @swagger
 * /pet:
 *   post:
 *     summary: Cadastro de pets
 *     description: Cadastra novos pets no sistema.
 *     tags:
 *       - Pets
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               id_user:
 *                 type: string
 *               name:
 *                 type: string
 *               animal:
 *                 type: string
 *               age:
 *                 type: number
 *             required:
 *               - id_user
 *               - name
 *               - animal
 *               - age
 *           example:
 *             name: Belinha
 *             id_user: 9a55dc52-6876-4651-b912-fe178f7d406c
 *             animal: cachorro
 *             age: 3
 *     responses:
 *      '201':
 *        description: Pet cadastrado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *             properties:
 *               id:
 *                 type: string
 *                 description: Identificador `id` do pet criado.
 *      '400':
 *        description: Erro na requisição.
 *      '500':
 *        description: Erro interno no servidor.
 */
router.post('/', createValidation(), createController)

/**
 * @swagger
 * /pet:
 *   get:
 *     summary: Listagem de pets
 *     description: Lista todos os pets cadastrados no sistema.
 *     tags:
 *       - Pets
 *     responses:
 *      '200':
 *        description: Pets listados com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Pet'
 *      '500':
 *        description: Erro interno no servidor.
 */
router.get('/', listController)

/**
 * @swagger
 * /pet/{id}:
 *   get:
 *     summary: Listagem de pets por id
 *     description: Lista um pet dado seu `id`.
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *      '200':
 *        description: Pet listado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Pet'
 *      '400':
 *        description: Erro na requisição.
 *      '404':
 *        description: Pet não encontrado.
 *      '500':
 *        description: Erro interno no servidor.
 */
router.get('/:id', getByIdValidation(), getByIdController)

/**
 * @swagger
 * /pet/{id}:
 *   patch:
 *     summary: Atualização de pets
 *     description: Atualiza um pet dado seu `id`.
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: id
 *         in: path
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               id_user:
 *                 type: string
 *               name:
 *                 type: string
 *               animal:
 *                 type: string
 *               age:
 *                 type: number
 *           example:
 *             name: Belinha
 *             id_user: 9a55dc52-6876-4651-b912-fe178f7d406c
 *             animal: cachorro
 *             age: 3
 *     responses:
 *      '204':
 *        description: Pet atualizado com sucesso.
 *      '400':
 *        description: Erro na requisição.
 *      '404':
 *        description: Pet não encontrado
 *      '500':
 *        description: Erro interno no servidor.
 */
router.patch('/:id', updateValidation(), updateController)

/**
 * @swagger
 * /pet/{id}:
 *   delete:
 *     summary: Remoção de pets
 *     description: Remove um pet dado seu `id`.
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *      '204':
 *        description: Pet removido com sucesso.
 *      '400':
 *        description: Erro na requisição.
 *      '404':
 *        description: Pet não encontrado.
 *      '500':
 *        description: Erro interno no servidor.
 */
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
