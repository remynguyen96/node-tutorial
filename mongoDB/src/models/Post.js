const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let category = new Schema({
    name: {
        type: String,
        required: true
    },
    cat_id: {
        type: Number,
        required: true
    }
});

let postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categories: [category],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});


module.exports = mongoose.model('Post', postSchema)