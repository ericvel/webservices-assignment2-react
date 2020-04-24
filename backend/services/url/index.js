const express = require('express');
const router = express.Router();

router.use(express.json());

// Define Routes
router.use('/', require('./routes/get'));
router.use('/', require('./routes/post'));
router.use('/', require('./routes/delete'));
router.use('/', require('./routes/put'));

module.exports = router;