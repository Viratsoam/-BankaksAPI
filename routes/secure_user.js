const express = require('express');
const router = express.Router();
const UserSecureController = require('../controllers/user_secure_controller');

// verify number 
router.post('/checkNumber', UserSecureController.CheckNumber);

module.exports = router;