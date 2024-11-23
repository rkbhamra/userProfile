const express = require('express');
const router = express.Router();

/**
 * @api {get} / Home Page
 * @apiName GetHomePage
 * @apiGroup General
 *
 * @apiSuccess {String} render The view template for the home page.
 */
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
