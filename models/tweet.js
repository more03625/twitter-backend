const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: false,
        trim: true
    },
    images: {
        type: Array,
        required: false
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Number,
        default: 1,
        enum: [1, 2]
    }
}, { timestamps: true });

module.exports = mongoose.model("Tweet", tweetSchema)