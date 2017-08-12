'use strict';

const http = require('http');

const factApi = process.env.FACT_API;

module.exports = (fact, toNumber) => {
  return new Promise((resolve, reject) => {
    http.get(factApi, (response) => {
      let body = '';

      response.on('data', (data) => {
        body += data;
      });

      response.on('end', () => {
        resolve(body);
      });
    });
  });
};