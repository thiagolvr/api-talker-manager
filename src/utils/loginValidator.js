const validator = require('email-validator');

const theEmail = (email, res) => {
  const emailIsValid = validator.validate(email);
 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailIsValid) {
    return res
    .status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return true;
 };

 const thePassword = (password, res) => {
  const passwordIsValid = password.length > 5;

  if (!password) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (!passwordIsValid) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return true;
 };

 const validate = {
  theEmail,
  thePassword,
 };

 module.exports = validate;