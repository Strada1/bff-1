const authData = (token) => {
    return { key: 'Authorization', value: 'Bearer ' + token };
  };
  
  module.exports = authData;