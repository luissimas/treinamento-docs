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

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cadastro de usuários
 *     description: Cadastra novos usuários no sistema.
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - age
 *               - password
 *           example:
 *             name: Jorge
 *             email: jorge@hotmail.com
 *             age: 34
 *             password: jorge3847
 *     responses:
 *      '201':
 *        description: Usuário cadastrado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *             properties:
 *               id:
 *                 type: string
 *                 description: Identificador `id` do usuário criado.
 *      '400':
 *        description: Erro na requisição.
 *      '409':
 *        description: Já existe um usuário cadastrado com o e-mail informado.
 *      '500':
 *        description: Erro interno no servidor.
 */
router.post('/', createValidation(), createController)

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Listagem de usuários
 *     description: Lista todos os usuários cadastrados no sistema
 *     tags:
 *       - Users
 *     responses:
 *      '200':
 *        description: Usuários listados com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                allOf:
 *                  - $ref: '#/components/schemas/User'
 *                  - type: object
 *                    properties:
 *                      pets:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Pet'
 */
router.get('/', listController)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Listagem de usuários por id
 *     description: Lista um usuário e seus pets dado seu `id`
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *      '400':
 *        description: Erro na requisição.
 *      '404':
 *        description: Usuário não encontrado.
 *      '200':
 *        description: Usuário listado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                allOf:
 *                  - $ref: '#/components/schemas/User'
 *                  - type: object
 *                    properties:
 *                      pets:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Pet'
 */
router.get('/:id', getByIdValidation(), getByIdController)

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Atualização de usuários
 *     description: Atualiza o cadastro de um usuário dado seu `id`
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              age:
 *                type: number
 *              password:
 *                type: string
 *           example:
 *             name: Jorge
 *             email: jorge@hotmail.com
 *             age: 34
 *             password: jorge3847
 *     responses:
 *      '400':
 *        description: Campos inválidos.
 *      '404':
 *        description: Usuário não encontrado.
 *      '409':
 *        description: Já existe um usuário cadastrado com o e-mail informado.
 *      '204':
 *        description: Usuário atualizado com sucesso.
 */
router.patch('/:id', updateValidation(), updateController)

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remoção de usuários
 *     description: Remove um usuário dado seu `id`
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *      '400':
 *        description: Erro na requisição.
 *      '404':
 *        description: Usuário não encontrado.
 *      '204':
 *        description: Usuário removido com sucesso.
 */
router.delete('/:id', deleteValidation(), deleteController)

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         age:
 *           type: number
 */

export { router }
