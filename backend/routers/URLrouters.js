const express = require('express');
const {shortURLHandler,webHandle,analyticsHandle,analyticsDeleteHandle}  = require('../controllers/controllers');
const {checkSession}=require('../services/middleware')
const URLrouter = express.Router();


// URL ROUTES
URLrouter.post('/',checkSession, shortURLHandler);
URLrouter.get('/analytics',checkSession,analyticsHandle)
URLrouter.get('/:shortId',checkSession,webHandle)
URLrouter.delete('/analytics/delete',checkSession,analyticsDeleteHandle)



module.exports = URLrouter;
