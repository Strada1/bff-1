const createAuthData = (token) => {
  return { key: 'Authorization', value: 'bearer ' + token };
};

module.exports = { createAuthData };