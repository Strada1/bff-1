const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdAeWFuZGV4LnJ1IiwicGFzc3dvcmQiOiJxd2VyeTU1NSIsImlhdCI6MTY3NjU1NzQ4NX0.4-Y39Be0Scas5Q7iGkqLB5ukONkhaK1tMmPo7X9MNZM';

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkd29yZ0BtYWlsLnJ1IiwicGFzc3dvcmQiOiIxMjNwb2xlcnQiLCJpYXQiOjE2NzY1NTc1MTR9.EeMIJ5kJMh4plmKgtTqBbCNGhSA6XiPNujUZ09m_7Q0';

const adminAuthOptions = {
  key: 'Authorization',
  value: 'bearer ' + adminToken,
};

const userAuthOptions = {
  key: 'Authorization',
  value: 'bearer ' + userToken,
};

module.exports = { adminToken, adminAuthOptions, userToken, userAuthOptions}