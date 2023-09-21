const mongoose = require("mongoose");

// Define a new schema for the "poll" collection in the database
const PollSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      name: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  voters: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Poll", PollSchema);
