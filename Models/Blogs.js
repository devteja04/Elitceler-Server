const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    blogTitle : {
        type : String,
        required : true
    },
    blogDescription : {
        type : String,
        required : true,
    },
    blogImage : {
        type : String,
    },
    dateUpload : {
        type : Date,
        default : Date.now
    }
})

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;