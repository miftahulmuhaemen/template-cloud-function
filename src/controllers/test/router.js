const express = require('express');
const {body, validationResult} = require('express-validator');
const {referer} = require('../../middleware/environment');

const router = express.Router();
router.use(referer);
router.post(
    '/test',
    body('userid').notEmpty().trim().escape(),
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(new Error('Error'));
        }
        res.end();
      } catch (err) {
        next(err);
      }
    },
);

module.exports = router;
