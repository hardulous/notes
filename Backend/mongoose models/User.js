// creating our 1st Schema User for creating collection

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining your schema : schema is a format in which data is stored in MongoDB managed by mongoose because mongoDB allows to store data in any format 

const UserSchema = new Schema({
  
     name:{
         type:String,
         required:true     //here now user must have to fill this field
     },

     email:{
        type:String,
        required:true,     
        unique:true       // now email will be unique and must not be dublicate 
    },

    password:{
        type:String,
        required:true     
    },

    date:{
        type:Date,
        default:Date.now     // here dont do Date.now() because just give function name as we data not mention then by default current data is applied
    },
     

  });

  // now exporting this Schema by first converting it into model which take 2 argument model name and Defined Schema 
  module.exports = mongoose.model("user",UserSchema);