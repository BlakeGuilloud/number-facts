'use strict';

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'us-east-1' });

const sendMessage = require('./lib/message');
const getFact = require('./lib/fact');
const { handleError, handleSuccess } = require('./lib/helpers');

module.exports.run = (event, context, callback) => {
  getFact()
    .then(sendMessage)
    .then(message => callback(null, handleSuccess(message)))
    .catch(err => callback(null, handleError(err)));
};