const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "The title of the post is required."],
  },
  content: {
    type: String,
    required: [true, "The content of the post is required."],
  },
  backgroundImage: {
    type: String,
    default: "#",
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: [true, "The comment is required"],
      },
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The author of the post is required."],
  },
});

module.exports = mongoose.model("Post", postSchema);
