const express = require('express');
const dotenv = require("dotenv");
const passport = require('passport');
const globalError = require('./middlewares/errorMiddleware');
const app = express();
const userRouter = require('./router/userRouter')
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(passport.initialize());
//Router
app.get('/',(req,res,next)=>{
    console.log('hello project')
    
})
app.use('/api/v1/auth',userRouter)
app.use(globalError)
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})

//Handle Rejection Outside Express 
//Event ==> listener ==> 
process.on('unhandledRejection',(err)=>{
    console.error(`unhandleRejection Error: ${err.name} | ${err.message}`);
    process.exit(1);
})