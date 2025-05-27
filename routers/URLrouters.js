const express = require('express');
const {shortURLHandler,webHandle,analyticsHandle}  = require('../controllers/controllers');

const URLrouter = express.Router();


// URL ROUTES
URLrouter.post('/', shortURLHandler);
URLrouter.get('/:shortId',webHandle)
URLrouter.get('/analytics/:shortId',analyticsHandle)


module.exports = URLrouter;
