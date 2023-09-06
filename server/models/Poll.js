const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    creatorId: {  // For clarity, renamed to creatorId to indicate it's an ID
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming your User model is named 'User', adjust accordingly
        required: false
        // s
    },
    hasVoted: {
        type: Boolean,
        default: false
    },
    question: {
        type: String,
        required: true
    },
    options: [
        {
            name: {
                type: String,
                required: true
            },
            votes: {
                type: Number,
                default: 0
            }
        }
    ],
    voters: [
        {
            userId: {  // Similarly, renamed to userId for clarity
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'  // Adjust if your user model is named differently
            }
        }
    ],
});

// Optionally, if you frequently search by creatorId or any other field, you might want to index them
// PollSchema.index({ creatorId: 1 });

module.exports = mongoose.model('Poll', PollSchema);  // Changed 'poll' to 'Poll' for consistency
