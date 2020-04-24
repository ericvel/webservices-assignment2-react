const express = require('express');
const router = express.Router();

router.use(express.json());

// Define Routes
router.use('/', require('./routes/post'));

module.exports = router;