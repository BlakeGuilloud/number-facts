'use strict';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN
const fromNumber = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = (fact, toNumber) => {
  const options = {
    body: fact,
    to: '+18438126962',
    from: fromNumber,
  };

  return new Promise((resolve, reject) => {
    client.messages.create(options)
      .then(resolve)
      .catch(reject);
  });
};