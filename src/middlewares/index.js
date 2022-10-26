const fs = require('fs').promises;
const path = require('path');
const validator = require('email-validator');
const { join } = require('path');

const readTalkerFile = async () => {
  try {
    const talker = await fs.readFile(
      path.resolve(__dirname, '..', 'talker.json'),
    );
    return await JSON.parse(talker);
  } catch (error) {
    return error;
  }
};

const writeTalkerFile = async (talker) => {
  try {
      await fs.writeFile(join(__dirname, '..', 'talker.json'), JSON.stringify(talker));
  } catch (error) {
      return error;
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
 return res
  .status(400).json({ message: 'O campo "email" é obrigatório' }); 
}
  if (!validator.validate(email)) {
 return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  if (!password) {
 return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
}
  if (password.length < 6) {
 return res
  .status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}

  next();
};

function validateAuthorization(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
}

const validateName = (req, res, next) => { // req4
  const { name } = req.body;

  const isValid = name && name.length > 2;
  if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!isValid) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

 const validateAge = (req, res, next) => {
  const { age } = req.body;

  const isValid = age && age > 17;
  if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!isValid) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => { 
  const talker = req.body;

  const regex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!talker.talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  if (!talker.talk.watchedAt) {
 return res
  .status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
}
  if (!regex.test(talker.talk.watchedAt)) {
    return res
      .status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  
  if (talk.rate <= 0 || talk.rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!talk.rate) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

const validation = {
  validateAuthorization,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
};

module.exports = {
  readTalkerFile,
  writeTalkerFile,
  validateLogin,
  validation,
};
