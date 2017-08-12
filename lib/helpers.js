'use strict';

function handleSuccess(message) {
  const body = JSON.stringify({
    body: message.body,
    from: message.from,
  });

  return {
    statusCode: 200,
    body,
  }
}

function handleError(err) {
  return {
    statusCode: 500,
    message: 'Something went terribly wrong.'
  }
}

module.exports = {
  handleError,
  handleSuccess,
};