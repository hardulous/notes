
const express = require('express');
const router = express.Router(); 
const User = require('../mongoose models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "AmanisaGoodBoy";
const jwt = require('jsonwebtoken');
// importing middlware 
const fetchUser = require("../middleware/fetchUser")

// Route1: END POINT TO CREATE USER by POST "/auth/api/createuser" - no login required

router.post('/createuser',[

    body('email',"enter a valid email").isEmail(),
    body('name',"not a valid name").isLength({min:3}),
    body('password',"enter a valid password").isLength({min:5}),

], async (req , res)=>{
       
      let success = false;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success});
      }
        
      try{

        let user = await User.findOne({email:req.body.email});
       
        if(user){

          return res.status(400).json({error:"Sorry user with this email already existed", success});
        }
        
        const salt = await bcrypt.genSalt(10); 
        const secPass = await bcrypt.hash(req.body.password,salt)

        //  creating new USER document , insert it and return as well 
        addUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass, 
      });
        
      // payload data for JWT token
        const data = {
          user:{
            id:addUser.id,
          }
        }
        
        const authToken = jwt.sign(data,JWT_SECRET);
        console.log(authToken);
        success=true;
        res.json({authToken,success});

    }catch(error){

        console.log(error.message);
        res.status(500).send("Internal Server error")
    }

})

// Route2:END POINT TO AUTHENTICATE USER that is while login by POST "/auth/api/login" - no login required

router.post('/login',[

    body('email',"enter a valid email").isEmail(),
    body('password',"Password can not be blank").exists()

], async (req , res)=>{
    
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() , success});
    }
    
    // now if reach here means i got email and password which is correct but now check either valid or not 
    const {email , password} = req.body;
    
    try {
         
        let user = await User.findOne({email}); // this will return user with email wriiten while loin 

        // if user does not exist
        if(!user){
            
            return res.status(400).json({error:"Please login with correct Credentials",success});
        }

        // but if user exist then compare password entered by user and password of user which we get from .findOne() which is a hash string and return true or false
        const passwordCompare = await bcrypt.compare(password,user.password);
         
        // if wrong password
        if(!passwordCompare){
            
            return res.status(400).json({error:"Please login with correct Credentials",success});
            
        }
        
        // if user exist and both email and entered passowrd are genuine then give user JWT token
       
        const data = {

            user:{
              id:user.id,
            }

          }
          
          const authToken = jwt.sign(data,JWT_SECRET);
          success = true;
          res.json({success,authToken});

    } 
    catch(error){

        console.log(error.message);
        res.status(500).send("Internal Server error")
    }

})

// Route3 : END POINT TO GIVE LOGGED IN USER DETAILS by POST  "/auth/api/getuser" -login required ( as login required so we have to send JWT token and by this token have to decode user.id from it to get that user all details )

// here what happen first we come to this end point which need middleware to get user id then this async(req , res) function execute 
router.post('/getuser', fetchUser ,async (req , res)=>{


    try {
        
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // check in MongoDb and send document which match id userId and as well as select all that user details except password 
        res.send(user);
    
    } catch (error) {
        
        console.log(error.message);
        res.status(500).send("Internal Server error")
    
    }


})




module.exports = router;

