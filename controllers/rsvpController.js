const express = require('express');
const model = require('../models/rsvp')


exports.createRsvp = (req, res, next)=>{
        let resp = req.params.value;
        let rsvp = {
            connection: req.params.id,
            user: req.session.user,
            rsvp: resp
        }
        model.findOneAndUpdate({user: req.session.user,connection: req.params.id}, rsvp, { upsert: true, new: true })
        .then(rsvp=>{
            if(rsvp){
                req.flash('success', 'You created new RSVP successfully');
                res.redirect('/user/profile')
            }else{
                req.flash('success', 'You updated the RSVP successfully');
                res.redirect('/user/profile')
            }
        })
        .catch(err=>next(err)); 
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    model.findByIdAndRemove(id, {useFindAndModify: false})
    .then(rsvp=>{
        if(rsvp){
            req.flash('success', 'Your rsvp was sucessefully deleted');
            res.redirect('/user/profile');
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
}