const shortid = require("shortid");
const URL = require("../modals/urlSchema");
const users = require("../modals/usersSchema");
const { setUser, getUser } = require("../services/cookies");
const {
  hashedPassword,
  checkHashPassword,
  
  
} = require("../services/hashpassword");

async function shortURLHandler(req, res) {
  const body = req.body;
  const userId =getUser( req.cookies.token);

  if (!body.url) {
    return res.status(400).json({ error: "redirect url not given" });
  }

  const shortId = shortid.generate();

  await URL.create({
    shortId,
    url: body.url,
    visitHistory: [],
    createdBy: userId,
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

    res.redirect(entry.url);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function analyticsHandle(req, res) {
  try {
    const userId =getUser( req.cookies.token);

    const urls = await URL.find({ createdBy: userId }).sort({ createdAt: -1 });

    if (!urls) {
      return res.status(404).json({ error: "No URLs found for this user" });
    }
    else if (!userId){
       return res.status(401).json({ msg: `unauthorized `,redirectTo:'/user/login' });
    }
    res.json(
      urls.map((u, i) => ({
        slNo: i + 1,
        shortId: u.shortId,
        url: u.url,
        createdAt: u.createdAt,
        clicks: u.visitHistory.length,
      }))
    );
  } catch (error) {

    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function analyticsDeleteHandle(req, res) {
  try {
    const userId = getUser(req.cookies.token);

    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const result = await URL.deleteMany({ createdBy: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "No URLs to delete" });
    }

    return res.status(200).json({ msg: "URLs deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Error occurred while deleting the analytics" });
  }
}

// user auth
async function createuserHandle(req, res) {
  try {
    const { name, email, password } = req.body;
    const userExist = await users.findOne({ email });
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "field required !" });
    } else if (userExist) {
      return res.status(409).json({ msg: `user already exist.` });
    }
    const hashedpasswordValue = await hashedPassword(password);
    console.log("Hashed Password:", hashedpasswordValue);
    await users.create({
      name,
      email,
      password:hashedpasswordValue,
    });
    return res.status(201).json({ msg: `account created successfully ! `,redirectTo:'/user/login' });
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function fetchuserHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required." });
    }
    const userQuery = await users.findOne({ email });
    if (!userQuery) {
      return res.json({ msg: "Invalid email or password " });
    }
    const passwordMatch = await checkHashPassword(password, userQuery.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid email or password." });
    } else {
      const token = setUser(userQuery);
      res.cookie("token", token);
      
      return res.json({ msg: ` login successfully`,redirectTo:'/' });
    }
  } catch (err) {
    return res.json({ msg: `some error occured while fetching user  ${err}` });
  }
}

async function deleteuserHandle(req, res) {
  try {
    const user = getUser(req.cookies.token);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized access" });
    } else {
      const deleteUser = await users.findByIdAndDelete(user._id);
      if (!deleteUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.clearCookie("token", { httpOnly: true });
      return res.json({ msg: "user deleted successfully" });
    }
  } catch (err) {
    return res.json({ msg: `some error occured while deleting user ${err}` });
  }
}

async function updateuserHandle(req, res) {
  try {
    const user = getUser(req.cookies.token);

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const { newName, newEmail, newPassword } = req.body;
    const passwordhashing=hashedPassword(newPassword)
    const updatedUser = await users.findOneAndUpdate(
      { _id: user._id },
      {
        name: newName,
        email: newEmail,
        password: await passwordhashing,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found or update failed" });
    }

    return res.json({
      msg: "Updated successfully",
      user: updatedUser.toObject(),
    });
  } catch (err) {
    console.error(`Some error occurred: ${err}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
}



module.exports = {
  shortURLHandler,
  webHandle,
  analyticsHandle,
  createuserHandle,
  fetchuserHandler,
  deleteuserHandle,
  updateuserHandle,
  analyticsDeleteHandle
};
