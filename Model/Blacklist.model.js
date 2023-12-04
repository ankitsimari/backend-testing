const { default: mongoose } = require("mongoose");



const blacklistSchema = mongoose.Schema({
    token:String
},{
    versionKey:false
})

const BlackList = mongoose.model("Blacklist",blacklistSchema);

module.exports={BlackList}