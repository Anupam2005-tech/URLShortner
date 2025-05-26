const shortid = require('shortid');
const URL = require('../modals/urlSchema');

async function shortURLHandler(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: 'redirect url not given' });
    }

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        url: body.url, 
        visitHistory: []
    });

    return res.json({ id: shortId });
}

async function webHandle(req, res) {
    const shortId = req.params.id;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    // Optionally update visit history
    entry.visitHistory.push({ timeStamp: Date.now() });
    await entry.save();

    // Redirect to the original URL
    res.redirect(entry.url);
}
async function analyticsHandle(req,res){
    const shortId=req.params.shortId
    const result=await URL.findOne({shortId})
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports ={ shortURLHandler,webHandle,analyticsHandle}
