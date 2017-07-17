const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let personSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    stories: [{
        type: Schema.Types.ObjectId,
        ref: 'Story'
    }]
});


const Person = module.exports = mongoose.model('Person', personSchema);
