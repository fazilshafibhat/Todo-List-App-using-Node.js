const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    description:{
        type : String,
        required : true
    },
    duedate: {
        type : String,
        required : true
        },
    category : {
        type : String,
        required : true
    }
});

// Collections
const List = mongoose.model('List', listSchema);

module.exports = List;