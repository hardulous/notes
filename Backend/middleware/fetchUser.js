// Middleware functions have access to the request object and the response object and also the next function in the application request-response lifecycle.

// Middlewares are used for:

// Change the request or response object.
// Execute any program or code
// End the request-response lifecycle
// Call the next middleware.

const jwt = require('jsonwebtoken');
const JWT_SECRET = "AmanisaGoodBoy";

const fetchUser = (req,res,next)=>{

    // get the user.id from JWT token and add it top req object

    // getting token from header auth-token
    const token = req.header('auth-token');

    // if token is not present
    if(!token){

        res.status(401).send({error:"Please authenticate using a valid token"});
    }
    
    // if w got token then verify it first 
    try {
    
        const data = jwt.verify(token,JWT_SECRET); // this .verify() if true then it return {   and this is payload data which is put while sign
        //     "user": {
        //       "id": "61c2d09dbef5b2237a4e372b"
        //     },
        //     "iat": 1640158425
        //   }

        req.user = data.user; // now my req is modified and contain user 
        next(); // here this means execute asyn (res,req) function of auth6.js with end point getuser

    }
     catch (error) {
        
        res.status(401).send({error:"Please authenticate using a valid token"});
    }

}

module.exports = fetchUser;