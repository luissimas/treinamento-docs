import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from 'src/database/models/user'
import { EntityNotFound, UserAlreadyExists } from '@errors/errors'

type UserData = {
  id: string
  name: string
  age: number
  email: string
  password: string
}

async function createController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { name, age, email, password }: UserData = req.body

  try {
    const user = await UserModel.query().where({ email }).first()

    if (user) {
      throw new UserAlreadyExists('email', email)
    }

    const id = uuid()
    const hashedPassword = await hash(password, 12)

    await UserModel.query().insert({ id, name, age, email, password: hashedPassword })

    return res.status(201).json({ id })
  } catch (error) {
    return next(error)
  }
}

async function listController(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const users = await UserModel.query()
      .select('id', 'name', 'age', 'email')
      .withGraphFetched('pets')
      .modifyGraph('pets', builder => {
        builder.select('id', 'id_user', 'name', 'animal', 'age')
      })

    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

async function getByIdController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params

  try {
    const user = await UserModel.query()
      .select('id', 'name', 'age', 'email')
      .findById(id)
      .withGraphFetched('pets')
      .modifyGraph('pets', builder => {
        builder.select('id', 'id_user', 'name', 'animal', 'age')
      })

    if (!user) {
      throw new EntityNotFound('User')
    }

    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

async function updateController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params
  const { name, age, email, password }: UserData = req.body

  try {
    const user = await UserModel.query().select().findById(id)

    if (!user) {
      throw new EntityNotFound('User')
    }

    const userByEmail = await UserModel.query().where({ email }).first()

    if (userByEmail) {
      throw new UserAlreadyExists('email', email)
    }

    const hashedPassword = password ? await hash(password, 12) : user.password

    await UserModel.query().findById(id).patch({ id, name, age, email, password: hashedPassword })

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

async function deleteController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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

export { createController, listController, getByIdController, updateController, deleteController }
