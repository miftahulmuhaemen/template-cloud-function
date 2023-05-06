/* eslint-disable camelcase */
const {execute} = require('../qore/qore');

/**
    @param {Error} err - The error object
    @param {Object} req - The request object
    @param {Object} res - The response object
    @param {Function} next - The next function to be called in the middleware chain
    @throws {Error} Throws an error if the environment is invalid or if there is an error executing the Qore request
*/
const standard = async (err, req, res, next) => {
  const {env} = req.body;
  const data = {
    name: `${req.path === '/' ? req.hostname : req.path}`,
    body: JSON.stringify(req.body),
    error: err instanceof Error ? `${err}` : JSON.stringify(err),
  };

  await execute(
      [
        {
          operation: 'Insert',
          instruction: {
            table: 'log_system_error',
            name: 'insert',
            data: data,
          },
        },
      ],
      env,
  );

  if (req.xhr) {
    res.status(500).end;
  } else {
    next(err);
  }
};

module.exports = {standard};
