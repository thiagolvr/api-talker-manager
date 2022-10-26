const fs = require('fs').promises;
const path = require('path');
const validator = require('email-validator');

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

module.exports = {
  readTalkerFile,
  validateLogin,
};
