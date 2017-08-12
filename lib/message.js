'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TableName = process.env.DYNAMODB_TABLE;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN
const fromNumber = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = (fact) => {
  const params = {
    TableName,
  };
  dynamoDb.scan(params, (error, result) => {
    console.log('result : ', result);
    result.Items.forEach((item) => {
      console.log('item : ', item);
      const { toNumber } = item;

      const options = {
        body: fact,
        to: toNumber || '+18438126962',
        from: fromNumber,
      };
    
      return new Promise((resolve, reject) => {
        client.messages.create(options)
          .then(resolve)
          .catch(reject);
      });
    });
  });
  // TODO: Fetch from a dynamoDB table and loop over all entries.
  // [
  //   '+18438126962', // blake
  //   '+18433840117', // lauren
  // ]
  //   .forEach((toNumber) => {
  //     const options = {
  //       body: fact,
  //       to: toNumber || '+18438126962',
  //       from: fromNumber,
  //     };
    
  //     return new Promise((resolve, reject) => {
  //       client.messages.create(options)
  //         .then(resolve)
  //         .catch(reject);
  //     });
  //   });
};