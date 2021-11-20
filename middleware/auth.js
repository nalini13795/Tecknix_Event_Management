const Connection = require('../models/connection');
const user = require('../models/user')

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else {
         req.flash('error', 'You are logged in already');
         return res.redirect('/user/profile');
     }
};

exports.isValidEmail = (req, res, next)=>{
    let email = req.body.email;
    if(email){
        user.findOne({email: email})
        .then(usr=>{
            if(usr){
                req.flash('error', 'Email Id already present');
                return res.redirect('/user/signup');
            }else{
                return next();
            }
        })
    }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.user){
        return next();
    }else {
         req.flash('error', 'You need to log in first');
         return res.redirect('/user/login');
     }
};

exports.isAuthor = (req, res, next) =>{
    let id = req.params.id;
    Connection.findById(id)
    .then(conn=>{
        if(conn) {
            if(conn.host == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a connection with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
