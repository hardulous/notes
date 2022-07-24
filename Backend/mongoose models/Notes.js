
// Everything in data in mongoose derived from Schema which is then converted into Models and then saved in MongoDB 

// Creating Notes Schema 

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,// here this objectId means this user is from different model that is foreign key 
        ref:'user'// name of that foreign key model  
    },

    title:{
        type:String,
        required:true     
    },

    description:{
       type:String,
       required:true,         
   },

    tag:{
       type:String,  
       default:"General"
   },

    date:{
       type:Date,
       default:Date.now  
   },

});

// again export by first onvert into model
module.exports = mongoose.model("Notes",NotesSchema);