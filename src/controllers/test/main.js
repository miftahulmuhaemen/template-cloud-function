const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const testEndpoint = require('./router');

if (process.env.NODE_ENV === 'development') dotenv.config();

const app = express();
app.use(cors({ // Necessary only for action `HTTP request`
  origin: '*',
}));

app.use('/', testEndpoint);
app.get('/debug', (req, res) => {
  res.json(req.body || {});
});
// Only use middleware error on latest line about expressJS.
exports.main = app;

