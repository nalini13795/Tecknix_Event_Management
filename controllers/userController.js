const express = require('express');
const model = require('../models/user')


exports.loginPage = (req,res) => {
    res.render('./user/login');
}

exports.signup = (req,res) => {
    res.render('./user/new');
}

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
        let user = new model(req.body);//create a new story document
        user.save()//insert the document to the database
        .then(user=> res.redirect('/user/login'))
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/user/new');
            }

            if(err.code === 11000) {
                req.flash('error', 'Email has been used');  
                return res.redirect('/user/new');
            }
            
            next(err);
        }); 
    
};

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/user/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/user/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/user/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    res.render('./user/profile');
    // model.findById(id) 
    // Promise.all([ model.findById(id), Story.find({author: id})])
    // .then(result=>{
    //     console.log(result);
    //     const [user, stories] = result;
    //     res.render('./user/profile', {user, stories})
    // })
    // .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



