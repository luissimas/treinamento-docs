import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from 'src/database/models/user'
import { EntityNotFound } from '@errors/errors'

type UserData = {
  id: string
  name: string
  age: number
  email: string
  password: string
}

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { name, age, email, password }: UserData = req.body

  try {
    const id = uuid()
    const hashedPassword = await hash(password, 12)

    await UserModel.query().insert({ id, name, age, email, password: hashedPassword })

    return res.status(201).json({ id })
  } catch (error) {
    return next(error)
  }
}

async function list(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const users = await UserModel.query().select('id', 'name', 'age', 'email').withGraphFetched('pets')

    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

async function getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params

  try {
    const user = await UserModel.query().select('id', 'name', 'age', 'email').findById(id).withGraphFetched('pets')

    if (!user) {
      throw new EntityNotFound('User')
    }

    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

async function update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params
  const { name, age, email, password }: UserData = req.body

  try {
    const user = await UserModel.query().select().findById(id)

    if (!user) {
      throw new EntityNotFound('User')
    }

    const hashedPassword = password ? await hash(password, 12) : user.password

    await UserModel.query().findById(id).patch({ id, name, age, email, password: hashedPassword })

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

async function remove(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params

  try {
    const user = await UserModel.query().select().findById(id)

    if (!user) {
      throw new EntityNotFound('User')
    }

    await UserModel.query().deleteById(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export { create, list, getById, update, remove }
