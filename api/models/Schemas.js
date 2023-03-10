const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const videoSchema = new Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const commentSchema = new Schema({
  text: { type: String, required: true },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});


// const User = mongoose.model("User", userSchema);
const Video = mongoose.model("Video", videoSchema);
const Comment = mongoose.model("Comment", commentSchema);
// const Reply = mongoose.model("Reply", replySchema);

// module.exports = { User, Video, Comment};
module.exports = { Video,Comment};