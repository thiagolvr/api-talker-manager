const express = require('express');
const bodyParser = require('body-parser');
const {
  readTalkerFile,
  validateLogin,
  validation,
  writeTalkerFile,
} = require('./middlewares');
const generateToken = require('./utils/generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkerContent = await readTalkerFile();
  return res.status(200).json(talkerContent);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerContent = await readTalkerFile();
  const result = talkerContent.find((talker) => +talker.id === +id);

  if (!result) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }

  res.status(200).json(result);
});

app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  let token;

  if (email && password) {
    token = generateToken(16);
  }
  return res.status(200).json({
    token,
  });
});

app.post(
  '/talker',
  validation.validateAuthorization,
  validation.validateName,
  validation.validateAge,
  validation.validateWatchedAt,
  validation.validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readTalkerFile();
    const id = talkers.length + 1;
    const talker = { name, age, talk, id };

    talkers.push(talker);
    await writeTalkerFile(talkers);

    return res.status(201).json(talker);
  },
);

app.put('/talker/:id', 
validation.validateAuthorization,
validation.validateName,
validation.validateAge,
validation.validateWatchedAt,
validation.validateRate,
 async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const talkers = await readTalkerFile();
  const talker = { id: +id, name, age, talk };

  talkers.push(talker);

  await writeTalkerFile(talkers);

  return res.status(200).json(talker);
});

app.listen(PORT, () => {
  console.log('Online');
});
