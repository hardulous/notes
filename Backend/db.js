
const mongoose = require('mongoose');

const connectToMongo = (URL)=>{
    
    console.log("CONNECTING TO DATABASE")
    return mongoose.connect( URL)
}

module.exports = connectToMongo;

// ############## IMPORTANT VERY VERY VERY VERY IMPORTANT NOTE ####################

// while preparing backend for hosting in heroku i face a error called buffer 10000ms for almost 2 days still can not able to find answer so to avoid this error just make sure the password and username in the connection string :: below must be correct so be sure about it 

// mongodb+srv://flanker:<password>@cluster0.i7wcw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 


