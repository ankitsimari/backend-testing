const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./Routes/user.Routes');
const { postRouter } = require('./Routes/post.Routes');
const app = express();
app.use(express.json());
app.use(cors());


app.use("/users",userRouter);
app.use("/post",postRouter)


app.listen(8080,async()=>{
await connection
console.log('DB is connected')
console.log('Post is running at 8080')
})