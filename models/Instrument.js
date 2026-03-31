const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
    uid: { 
            type: String, 
            required: true, 
            unique: true },
    name : {
            type: String,
            required: true
        },
    image : {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Instrument = mongoose.model('Instrument', instrumentSchema);

module.exports = Instrument;