const user = {
  _id: '63ee3cadfbd2dbac3c14db17',
  email: 'testpassword@mail.ru',
  password: 'testpassword',
  roles: ['client'],
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdAeWFuZGV4LnJ1IiwicGFzc3dvcmQiOiJxd2VyeTU1NSIsImlhdCI6MTY3NjU1NzQ4NX0.4-Y39Be0Scas5Q7iGkqLB5ukONkhaK1tMmPo7X9MNZM'
};

const userWithError = {
  _id: '7356:vfdksj|{23fdw;',
  email: 'error in email',
  password: '00'
};

module.exports = { user, userWithError };