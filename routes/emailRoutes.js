const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.route('/').post(emailController.createEmail);

module.exports = router;
