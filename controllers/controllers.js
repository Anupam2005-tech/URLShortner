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
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        entry.visitHistory.push({ timeStamp: Date.now() });
        await entry.save();

        // Redirect to the original URL
        res.redirect(entry.url);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function analyticsHandle(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports ={ shortURLHandler,webHandle,analyticsHandle}
