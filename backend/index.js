const express = require('express');
const dotenv = require("dotenv");
const passport = require('passport');
const globalError = require('./middlewares/errorMiddleware');
const app = express();
const authRouter = require('./router/authRouter')
const ApiError = require('./utils/ApiError')
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(passport.initialize());
//Router
app.use('/api/v1/auth',authRouter)

app.use('*',(req,res,next)=>{
    next(new ApiError(`can't find this URL: ${req.originalUrl}`,400));
})
//handle global error
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