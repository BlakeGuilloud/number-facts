'use strict';

function handleSuccess() {
  const body = JSON.stringify({
    body: 'Message sent successfully',
  });

  return {
    statusCode: 200,
    body,
  }
}

function handleError(err) {
  return {
    statusCode: 500,
    message: `Something went terribly wrong : ${err}`,
  }
}

module.exports = {
  handleError,
  handleSuccess,
};