const shortid = require("shortid");
const URL = require("../modals/urlSchema");
const users = require("../modals/usersSchema");
const {v4:uuidv4}=require("uuid")
const {setUser,getUser}=require("../services/cookies")

async function shortURLHandler(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "redirect url not given" });
  }

  const shortId = shortid.generate();

  await URL.create({
    shortId: shortId,
    url: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function webHandle(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    entry.visitHistory.push({ timeStamp: Date.now() });
    await entry.save();

    // Redirect to the original URL
    res.redirect(entry.url);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function analyticsHandle(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// user auth
async function createuserHandle(req, res) {
  try {
    const { name, email, password } = req.body;
    const userExist = users.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "field required !" });
    } 
    await users.create({
      name,
      email,
      password,
    });
    return res.status(201).json({ msg: "account created successfully !" });
  } catch (err) {
    console.error(err);
  }
}

async function fetchuserHandler(req,res){
try{
    const {email,password}=req.body
    const userQuery=  await users.findOne({email,password})
    if (!userQuery){
        return res.json({msg:"Invalid email or password "})
    }
    else{
        const sessionId=uuidv4()
        setUser(sessionId,userQuery)
        res.cookie('uuid',sessionId)
        return res.json({msg:` ${userQuery}`})
    }
}
catch(err){
    return res.json({msg:`some error occured while fetching user  ${err}`})
}
}

async function deleteuserHandle(req,res){
    try{
        const {name,email,password}=req.body
        const userQuery=await users.findOneAndDelete({name,email,password})
        if (!userQuery){
            return res.json({msg:"no such user exist"})
        }
        else{

            return res.json({msg:"user deleted successfully"})
        }
    }
    catch(err){
        return res.json({msg:`some error occured while deleting user ${err}`})
    }
}
module.exports = {
  shortURLHandler,
  webHandle,
  analyticsHandle,
  createuserHandle,
  fetchuserHandler,
  deleteuserHandle
};
