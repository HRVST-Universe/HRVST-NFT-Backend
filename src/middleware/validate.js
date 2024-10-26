import Joi from 'joi';

export const validateNFTMint = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateOpenEdition = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required(),
    maxSupply: Joi.number().integer().min(1).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateAirdrop = (req, res, next) => {
  const schema = Joi.object({
    recipient: Joi.string().required(),
    tokenId: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

export const validateToken = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    initialSupply: Joi.number().integer().min(1).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};