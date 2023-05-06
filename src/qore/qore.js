const fetch = require('cross-fetch');
const Constant = require('../constant');
const util = require('util');

/**
 * Executes Qore operations
 * @param {Array} body - The array of Qore operations to be executed
 * @param {string} env - The environment to be used for the request
 * @throws {Error} Throws an error if the environment is invalid or if there is an error executing the fetch request
 * @return {Object} Returns the response object from the API
 */
const execute = async (body, env) => {
  const res = await fetch(
      `${
            env === Constant.PRODUCTION ?
                process.env.QOREBASE_PROD_URL :
                process.env.QOREBASE_URL
      }/v1/execute`,
      {
        method: 'POST',
        headers: new Headers([
          ['accept', '*/*'],
          ['x-qore-engine-admin-secret', process.env.QOREBASE_ADMIN_SECRET],
          ['Content-Type', 'application/json'],
        ]),
        body: JSON.stringify({
          operations: body,
        }),
      },
  );
  const response = await res.json();
  if (response.statusCode >= 400) {
    throw response.message;
  }
  return response;
};

/**
 Authorizes a Qore user and returns a token
 @param {Object} body - The authorization credentials
 @param {string} env - The environment to be used for the request
 @return {Promise<string>} Returns a promise that resolves to a Qore token
 @throws {Error} Throws an error if the environment is invalid or if there is an error executing the fetch request
 */
const authorize = async (body, env) => {
  const res = await fetch(
      `${
            env === Constant.PRODUCTION ?
                process.env.QOREBASE_PROD_URL :
                process.env.QOREBASE_URL
      }/v1/authorize`,
      {
        method: 'POST',
        headers: new Headers([
          ['accept', '*/*'],
          ['x-qore-engine-admin-secret', process.env.QOREBASE_ADMIN_SECRET],
          ['Content-Type', 'application/json'],
        ]),
        body: JSON.stringify(body),
      },
  );
  const response = await res.json();
  if (response.statusCode >= 400) {
    throw response.message;
  }
  return response.token;
};

/**

 Retrieves a Qore storage token
 @param {string} env - The environment to be used for the request
 @return {Promise<string>} Returns a promise that resolves to a Qore storage token
 @throws {Error} Throws an error if the environment is invalid or if there is an error executing the fetch request
 */
const storageToken = async (env) => {
  const res = await fetch(
      `${
            env === Constant.PRODUCTION ?
                process.env.QOREBASE_PROD_URL :
                process.env.QOREBASE_URL
      }/v1/storage/token`,
      {
        method: 'POST',
        headers: new Headers([
          ['x-qore-engine-admin-secret', process.env.QOREBASE_ADMIN_SECRET],
        ]),
      },
  );
  const response = await res.json();
  if (response.statusCode >= 400) {
    throw response.message;
  }
  return response.token;
};

/**
 Retrieves a Qore file token for a specific table, column, and row
 @param {string} table - The Qore table name
 @param {string} column - The Qore column name
 @param {string} row - The Qore row ID
 @param {string} access - The access level for the file token
 @param {string} env - The environment to be used for the request
 @return {Promise<string>} Returns a promise that resolves to a Qore file token
 @throws {Error} Throws an error if the environment is invalid or if there is an error executing the fetch request
 */
const fileTokenTable = async (
    table,
    column,
    row,
    access,
    env,
) => {
  const res = await fetch(
      `${
            env === Constant.PRODUCTION ?
                process.env.QOREBASE_PROD_URL :
                process.env.QOREBASE_URL
      }/v1/files/token/table/${table}/id/${row}/column/${column}?access=${access}`,
      {
        method: 'GET',
        headers: new Headers([
          ['x-qore-engine-admin-secret', process.env.QOREBASE_ADMIN_SECRET],
        ]),
      },
  );
  const response = await res.json();
  if (response.statusCode >= 400) {
    throw response.message;
  }
  return response.token;
};

/**
 Uploads a file to Qore
 @param {string} filename - The name of the file to be uploaded
 @param {string} imageURL - The URL of the image to be uploaded
 @param {string} token - The Qore token to be used for the upload
 @param {string} env - The environment to be used for the request
 @return {Promise<Response>} Returns a promise that resolves to a Response object
 @throws {Error} Throws an error if the environment is invalid or if there is an error executing the fetch request
 */
const copyFile = async (
    filename,
    imageURL,
    token,
    env,
) => {
  const arrayBuffer = await fetch(imageURL).then((res) => {
    return res.arrayBuffer();
  });
  const buffer = Buffer.from(arrayBuffer);
  const formData = new FormData();
  formData.append('file', buffer, {filename: filename});
  const submitPromise = util.promisify(formData.submit).bind(formData);
  const submitOptions = {
    host: `${
            env === Constant.PRODUCTION ?
                process.env.QOREBASE_PROD_URL :
                process.env.QOREBASE_URL
    }`.replace('https://', ''),
    path: `/v1/files/upload?token=${token}`,
    headers: {
      'x-qore-engine-admin-secret': process.env.QOREBASE_ADMIN_SECRET,
    },
  };
  const res = await submitPromise(submitOptions);

  if (Number(`${res.statusCode}`) >= 400) {
    throw new Error('Upload file failed');
  }

  return res;
};

module.exports = {execute, authorize, copyFile, storageToken, fileTokenTable};
