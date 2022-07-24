
const express = require('express');
const router = express.Router();

// importing middlware 
const fetchUser = require("../middleware/fetchUser");
// importing Notes model
const Notes = require('../mongoose models/Notes');
// for validation of notes
const { body, validationResult } = require('express-validator');


// Routes1 : End point to Fetch all User Notes , using middleware - login needed
router.get('/fetchAllNotes',fetchUser, async (req , res)=>{
    
    try {
        
      const notes = await Notes.find({user:req.user.id}); // find and return all document in Notes model with id req.user.id which is present in payload while signing for JWT token

      res.json(notes);

    } catch (error) {
      
        console.log(error.message);
        res.status(500).send("Internal Server error")
        
    }
      
   
})


// Routes2 : End point to Create New Note by POST - login needed
router.post('/addnotes',fetchUser,[

    body('title',"enter a valid title").isLength({min:3}),
    body('description',"description must be at least 5 character").isLength({min:5}),

],async (req , res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
     
    try {

       // if here means notes is valid now create it 
       const {title,description,tag,date} = req.body;
       const note = await new Notes({user:req.user.id,title,description,tag,date});
       const savedNote = await note.save();

      res.send(savedNote);


    } 
    catch (error) {
        
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }
  
})

// Routes3 : End point to update an existing Note but user can update only their note not others note by PUT : login needed
router.put('/updateNote/:id',fetchUser,async (req , res)=>{

     const {title,description,tag} = req.body;

     // create a new note object
     const newNote = {};

     if(title){newNote.title=title};
     if(description){newNote.description=description};
     if(tag){newNote.tag=tag};
     
     try {
        
         // find the note to be updated
         let note = await Notes.findById(req.params.id) // here this params.id is as mentioned on end point

         // if note does not exist 
         if(!note){return res.status(404).send("Note note found")};

        // now if NOTE exist then check first wheater req id and note to be updated its user id is same
        // if not same means this note is not belong to req user 
        if(note.user.toString() !== req.user.id){
           return res.status(401).send("not Allowed")
        }

        // here means note exist and belong to req user 
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true}); // here $set contain value to put as updated and true means to update it and return as well 
     
        res.json(note);


     } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error")
     }
    

})


// Routes4 : End point to delete a existing Note by DELETE: login needed but again check wheather note belong to req user 
router.delete('/DeleteNote/:id',fetchUser,async (req , res)=>{

    try {
        
       // find the note to be deleted
       let note = await Notes.findById(req.params.id) 

       // if note does not exist 
       if(!note){return res.status(404).send("Note note found")};

       // now if NOTE exist then check first wheater req.user.id and note to be deleted its user id is same
       // if not same means this note is not belong to req user 
       if(note.user.toString() !== req.user.id){
           return res.status(401).send("not Allowed")
       }

       // here means note exist and belong to req user so delete it
       note = await Notes.findByIdAndDelete(req.params.id); 
    
       res.json({"success":"Note has been deleted",note:note});

    }catch (error) {
        
        console.log(error.message);
        res.status(500).send("Internal Server error")
    }

   

})



module.exports = router;
