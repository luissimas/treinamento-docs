import { Request, Response, NextFunction } from 'express'
import { BaseError } from '@errors/base-error'

type StatusAssoc = {
  [key: string]: number
}

const httpStatus: StatusAssoc = {
  EntityNotFound: 404,
  InvalidFieldError: 400,
  UserAlreadyExists: 409,
}

export async function handler(error: BaseError, _req: Request, res: Response, _next: NextFunction): Promise<Response> {
  const { message, details } = error
  const name = error.constructor.name
  const status = httpStatus[name] || 500

  if (message) {
    return res.status(status).json({ error: message, details: details })
  }

  return res.status(status).json({ 'Internal error': error.message })
}
