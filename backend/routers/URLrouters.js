const express = require('express');
const {shortURLHandler,webHandle,analyticsHandle}  = require('../controllers/controllers');
const {checkSession}=require('../services/middleware')
const URLrouter = express.Router();


// URL ROUTES
URLrouter.post('/',checkSession, shortURLHandler);
URLrouter.get('/:shortId',checkSession,webHandle)
URLrouter.get('/analytics/:shortId',checkSession,analyticsHandle)


module.exports = URLrouter;
