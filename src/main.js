const express = require('express');
const dotenv = require('dotenv');
const testEndpoint = require('./controllers/test/router');

if (process.env.NODE_ENV === 'development') dotenv.config();

const app = express();

app.use('/', testEndpoint);
app.get('/debug', (req, res) => {
  res.json(req.body || {});
});
// Only use middleware error on latest line about expressJS.
exports.main = app;

