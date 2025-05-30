const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
   url : {
      type: String,
      required: true,
      
    },
    visitHistory: [
      {
        timeStamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("URLshortner", URLSchema);

module.exports = URL;
