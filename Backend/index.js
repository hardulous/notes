
const connectToMongo = require('./db');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const cors = require('cors')

app.use(cors()) 
app.use(express.urlencoded())
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("WELCOME TO USER-LOGIN-NOTES API")
})
app.use('/api/auth',require('./Routes/auth6'));
app.use('/api/notes',require('./Routes/notes'));


const start = async (URL)=>{

  try {
      
      // here only if we are successfull in connecting to database then we will connect to server 
      await connectToMongo(URL);  // this will return promose therefore using await
      app.listen(port,()=>{
          console.log(`Sever is Listening on port ${port} , Hence connected to database`)
      })
      

  } catch (error) {
      console.log(error);
  }
}

start(process.env.CONNECTION_URL);
