const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        required: false
    },
    createdBy:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1,
        enum:[1,2]
    }
}, { timestamps: true });

module.exports = mongoose.model("Tweet", tweetSchema)