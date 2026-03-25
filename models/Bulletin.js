const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required : true
        },
        image: {
            type: String,
            required: false
        }
    },
    { timestamps : true }
);

const Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = Bulletin;