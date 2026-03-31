const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        uid: { 
            type: String, 
            required: true, 
            unique: true },
        name : {
            type: String,
            required: true
        },
        instrument : {
            type: String,
            required: true
        },
        image : {
            type: String,
            required: true
        },
        curriculum : {
            type: String,
            required: true
        }
    },
    { timestamps : true }
);

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports  = Teacher;