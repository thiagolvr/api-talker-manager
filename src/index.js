const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerFile, validateLogin } = require('./middlewares');
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
  const result = talkerContent
      .find((talker) => +talker.id === +id);

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

app.listen(PORT, () => {
  console.log('Online');
});
