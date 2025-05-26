const express = require('express');
const {shortURLHandler,webHandle,analyticsHandle}  = require('../controllers/controllers');

const router = express.Router();

router.post('/', shortURLHandler);
router.get('/:shortId',webHandle)
router.get('/analytics/:shortId',analyticsHandle)

module.exports = router;