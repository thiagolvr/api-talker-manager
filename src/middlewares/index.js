const fs = require('fs').promises;
const path = require('path');

const readTalkerFile = async () => {
  try {
      const talker = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'));
      return await JSON.parse(talker);
  } catch (error) {
      return error;
  }
};

module.exports = {
  readTalkerFile,
};