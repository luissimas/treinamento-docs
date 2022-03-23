import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { NextFunction, Request, Response } from 'express'
import { PetModel } from 'src/database/models/pet'
import { EntityNotFound } from '@errors/errors'

type PetData = {
  id: string
  id_user: string
  name: string
  animal: string
  age: number
}

async function createController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id_user, name, animal, age }: PetData = req.body

  try {
    const id = uuid()

    await PetModel.query().insert({ id_user, name, animal, age })

    return res.status(201).json({ id })
  } catch (error) {
    return next(error)
  }
}

async function listController(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const pets = await PetModel.query().select()

    return res.status(200).json(pets)
  } catch (error) {
    next(error)
  }
}

async function getByIdController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params

  try {
    const pet = await PetModel.query().select().findById(id)

    if (!pet) {
      throw new EntityNotFound('Pet')
    }

    return res.status(200).json(pet)
  } catch (error) {
    next(error)
  }
}

async function updateController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params
  const { id_user, name, animal, age }: PetData = req.body

  try {
    const pet = await PetModel.query().select().findById(id)

    if (!pet) {
      throw new EntityNotFound('Pet')
    }

    await PetModel.query().findById(id).patch({ id_user, name, animal, age })

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

async function deleteController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { id } = req.params

  try {
    const pet = await PetModel.query().select().findById(id)

    if (!pet) {
      throw new EntityNotFound('Pet')
    }
    await PetModel.query().deleteById(id)

    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export { createController, listController, getByIdController, updateController, deleteController }
