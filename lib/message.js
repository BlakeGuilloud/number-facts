'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda({ region: 'us-east-1' });

const TableName = process.env.DYNAMODB_TABLE;

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN
const fromNumber = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

function sendMessage(record, fact) {
  const { toNumber, name } = record;

  const payload = JSON.stringify({
    body: `Good morning ${name}!! ${fact}`,
    to: toNumber,
    from: fromNumber,
  });

  const sendMessagePayload = {
    FunctionName: 'twilio-services-dev-send-message',
    Payload: JSON.stringify(payload)
  };

  return lambda.invoke(sendMessagePayload);
}

function processScan(err, results, fact) {
  return results.Items.forEach((item) => sendMessage(item, fact));
}

module.exports = (fact) => {
  dynamoDb.scan({ TableName }, (err, results) => {
    results.Items.forEach((item) => sendMessage(item, fact));
  });
};