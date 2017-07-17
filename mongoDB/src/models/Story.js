const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let storySchema = Schema({
    _creator: {
        type: Number,
        ref: 'Person'
    },
    title: {
        type: String,
        required: true
    },
    fans: [{
        type: Number,
        ref: 'Person'
    }]
});


const Story = module.exports = mongoose.model('Story', storySchema);
