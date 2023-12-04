const { BlackList } = require("../Model/Blacklist.model");
const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try{
        const expiry = await BlackList.findOne({token});
        // console.log(expiry)
        if(expiry){
            res.send({"msg":"notAuthorized"})
        }else{
            jwt.verify(token, 'Ankit', function(err, decoded) {
                if(decoded){
                    req.body.email=decoded.email;
                    next()
                }else{
                    res.send({"err":"loginFirst"})
                }
              });
        }
    }
    catch(e){
        res.status(200).send({"error":e.message})
    }
}

module.exports={auth}