'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TableName = process.env.DYNAMODB_TABLE;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN
const fromNumber = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = (fact) => {
  dynamoDb.scan({ TableName }, (error, result) => {
    result.Items.forEach((item) => {
      const { toNumber } = item;

      const options = {
        body: fact,
        to: toNumber,
        from: fromNumber,
      };
    
      return new Promise((resolve, reject) => {
        client.messages.create(options)
          .then(resolve)
          .catch(reject);
      });
    });
  });
};