const mongoose = require('mongoose');
const {Schema} = mongoose;

const reachSchema = new Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const reachModel = mongoose.model('Contact', reachSchema);
module.exports = reachModel;