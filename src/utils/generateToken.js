function generateToken(num) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < num; i += 1) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

module.exports = generateToken;