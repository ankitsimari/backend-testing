const { default: mongoose } = require("mongoose");


const postSchema = mongoose.Schema({
    title:String,
    about:String,
    email:String
},{
    versionKey:false
})

const postModel = mongoose.model("post",postSchema);

module.exports={postModel}