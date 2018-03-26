var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var sanitize = require('mongo-sanitize');
var jwt = require('jsonwebtoken');

// async encryption
var bcrypt = require('bcrypt');
const saltRounds = 1;
// this should be stored in an environmental variable
var secretToken = 's3cr3t';



var handleError = function(res, err, code = 400){
    console.log(JSON.stringify(err));
    res
    .status(code)
    .json({'error' : JSON.stringify(err)});
}

var jsonResponse = function(res, message, code = 200) {
    res
    .status(code)
    .json({
        'message': message
    });

}


module.exports.userLogin = function(req, res){
    
    console.log(req.body);
    var userName = sanitize(req.body.username);
    var userPassword = sanitize(req.body.password);

    if (userName && userPassword){
        
        Users
        .findOne({
            'username': userName,
        })
        .exec(function(err, user){
            if (err) return handleError(res, err, 500);
            
            if (user && user.username && user.password){
                // find password after decryption
                
                bcrypt.compare(userPassword, user.password, function(err, isValid){
                    
                    if (err) return handleError(res, err);
                    
                    if (isValid){
                        
                        // return token if user has successfully signed in
                        var token = jwt.sign({ username: user.username }, secretToken, { expiresIn: 86400 }); //expirse in 24 hours
                        
                        
                        res
                        .status(200)
                        .json({success: true, token: token});
                        
                    }else{
                        jsonResponse(res, 'Unauthorized', 401);
                        
                    }
                    
                })
                
            }else{
                jsonResponse(res, 'invalid login', 401);
            }
            
        });
        
    }else{
        jsonResponse(res, 'invalid login', 401);
    }
    
}


module.exports.userRegister = function(req, res){
    
    var userName = sanitize(req.body.username);
    var password = sanitize(req.body.password);
    var name = sanitize(req.body.name);
    
    // check if values empty

    if (userName && password){
        
        Users
        .findOne({
            username: userName
        })
        .exec(function(err, user){
            
            if (err) return handleError(res, err);
            
            if (!user){
                console.log('in user');
                
                // encrypt user password
                bcrypt.hash(password, saltRounds, function(err, hash) {
                  // Store hash in your password DB.
                  
                    var UserData = new Users({
                        username: userName,
                        name: name,
                        password: hash
                        
                    });
                    
                    UserData.save(function(err,result){
                        
                        if (err) return handleError(res, err, 304);
                        
                        jsonResponse(res, 'user added to db', 201);
                        
                        
                    });
                    
                  
                  
                });
                

                
            }else{
                console.log('Username already exists');

                jsonResponse(res, 'Username already exists.', 304);
            }
            
        });

    }else{
        if (!userName){
            return jsonResponse(res, 'no username provided :(', 400);
            
        }else{
            return jsonResponse(res, 'no password provided :(', 400);
            
        }
    
    }
}

module.exports.authenticate = function(req, res, next) {
    // autherization header
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, secretToken, function(error, decoded) {
      if (error) {
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
          // decoded = decoded token
        req.user = decoded.username;
        console.log(req);
        next();
      }
    });
  } else {
    res.status(403).json('No token provided');
  }
};

module.exports.profileInfo = function(req, res){
    var returnFields = {
        name: 1,
        username:1,
        searchHistory:1
    }

    var userName = req.user;
    

    Users
    .findOne({
        username: userName
    })
    .select(returnFields)
    .exec(function(err, user){
            
        if (err) return handleError(res, err);
        res
        .status(200)
        .json(user);
    
    });
    
}