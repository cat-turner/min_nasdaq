var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var sanitize = require('mongo-sanitize');

// async encryption
var bcrypt = require('bcrypt');
const saltRounds = 1;



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
    
    console.log(req.query);
    var userName = sanitize(req.query.username);
    var userPassword = sanitize(req.query.password);

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
                        jsonResponse(res, 'valid login', 200);
                    }else{
                        jsonResponse(res, 'invalid login', 401);
                        
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
            username: userName,
            password: password
        })
        .exec(function(err, user){
            
            if (err) return handleError(res, err);
            console.log('----in findone---');
            
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
                        
                        jsonResponse(res, 'user added to db', 200);
                        
                        
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