const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messages = new Schema({
    message: {
        type: String
    }
},  {
        collection: 'messages'
    }
)

module.exports = mongoose.model('Message', messages)