import { celebrate, Joi, Segments } from 'celebrate'

function createValidation() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).required(),
      id_user: Joi.string().uuid().required(),
      animal: Joi.string().min(3).required(),
      age: Joi.number().integer().positive().max(130).required(),
    }),
  })
}

function getByIdValidation() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  })
}

function updateValidation() {
  return celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string().min(3),
        id_user: Joi.string().uuid(),
        animal: Joi.string().min(3),
        age: Joi.number().integer().positive().max(130),
      })
      .min(1),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  })
}

function deleteValidation() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  })
}

export { createValidation, getByIdValidation, updateValidation, deleteValidation }
