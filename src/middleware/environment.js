const Constant = require('../constant');

/**
 * Use this for Action/Pipeline when Global Variables exist
    @param {Object} req - The request object
    @param {Object} res - The response object
    @param {Function} next - The next function to be called in the middleware chain
    @throws {Error} Throws an error if the source is empty or invalid
    */
const standard = async (req, res, next) => {
  const source = req.get('source');
  if (!source) {
    throw new Error('Source empty');
  }
  switch (source) {
    case `${process.env.QOREBASE_PROD_URL}`:
      req.body['env'] = Constant.PRODUCTION;
      break;
    case `${process.env.QOREBASE_URL}`:
      req.body['env'] = Constant.DEVELOPMENT;
      break;
    default:
      throw new Error('Invalid source');
  }
  next();
};

/**
 * Use this for HTTP call when Global Variables not exist
    @param {Object} req - The request object
    @param {Object} res - The response object
    @param {Function} next - The next function to be called in the middleware chain
    @throws {Error} Throws an error if the referer is empty or invalid
    */
const referer = async (req, res, next) => {
  const referer = req.get('referer');
  if (!referer) {
    throw new Error('Referer empty');
  }

  const websiteProd = process.env.WEBSITE_PROD.split(',');
  const website = process.env.WEBSITE.split(',');

  if (websiteProd.includes(referer)) {
    req.body['env'] = Constant.PRODUCTION;
  } else if (website.includes(referer)) {
    req.body['env'] = Constant.DEVELOPMENT;
  } else {
    throw new Error('Invalid referer');
  }
  next();
};

module.exports = {referer, standard};
