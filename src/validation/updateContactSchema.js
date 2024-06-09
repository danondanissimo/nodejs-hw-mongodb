import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20).email(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20),
});
