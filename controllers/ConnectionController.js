const express = require('express');
const model = require('../models/connection');
const user = require('../models/user');
const rsvp = require('../models/rsvp');
const {DateTime} = require('luxon');
const router = express.Router();


exports.newConnection = (req,res) =>{
    res.render('./connections/newConnection')
};

exports.Connections = (req, res, next) => {
    model.find()
    .then(connections=>{
        let topics = [...
            new Set(connections.map(
              (obj) => {
                return obj.topic
              })
        )]
        res.render('./connections/connections', {connections, topics})
    })
    .catch(err=>next(err))
};

exports.Connection = (req,res) => {
    res.render('./connections/connection')
};

exports.showByID = (req, res, next) => {
    let id = req.params.id
    Promise.all([model.findById(id).populate('host', 'firstName lastName'), rsvp.count({connection: id, rsvp: "yes"})])
    .then(result=>{
        let [connection, count] = result;
        if(connection){
            connection =JSON.parse(JSON.stringify(connection)) 
            connection.when = JSON.stringify(connection.startTime).slice(1,11)
            connection.startTime = JSON.stringify(connection.startTime).slice(12,17);
            connection.endTime = JSON.stringify(connection.endTime).slice(12,17);
            res.render('./connections/connection',{connection, count})
        }else{
            let err = new Error('Cannot Find connection with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
}

exports.addConnection = (req, res, next) =>{
    // console.log(req.body);
    let connection = new model(req.body);
    connection.host =  req.session.user;
    if(req.body.startTime && req.body.endTime){
        req.body.startTime = req.body.startTime+'Z';
        req.body.endTime = req.body.endTime+'Z';
    }
    console.log(DateTime.now())
    if(DateTime.fromISO(req.body.startTime).ts > DateTime.fromISO(req.body.endTime).ts){
        req.flash('error', 'Invalid date and time, Start time should be smaller than end Time');  
        // let err = new Error('Invalid date and time, Start time should be smaller than end Time');
        // err.status = 400;
        // next(err);
        // req.flash('success', 'You connection was sucessefully created');
        res.redirect('back');
    }else if(DateTime.now().ts > DateTime.fromISO(req.body.startTime).ts || DateTime.now().ts > DateTime.fromISO(req.body.startTime).ts ){
        req.flash('error', 'Invalid date and time, time must be after todays date'); 
        res.redirect('/connections/newConnection');
    }
    connection.save(connection)
    .then(()=>{
        req.flash('success', 'You connection was sucessefully created');
        res.redirect('/connections')
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', 'validation error');
            req.redirect('back');    
        }
        next(err);
    });
}

exports.delete = (req, res, next) =>{
    let id = req.params.id;
    Promise.all([model.findByIdAndRemove(id, {useFindAndModify: false}), rsvp.deleteMany({connection: id})])
    .then(connection=>{
        if(connection){
            req.flash('success', 'You connection was sucessefully deleted');
            res.redirect('/connections');
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
}

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(connection=>{
        if(connection){
            connection =JSON.parse(JSON.stringify(connection)) 
            connection.startTime = JSON.stringify(connection.startTime).slice(1,20);
            connection.endTime = JSON.stringify(connection.endTime).slice(1,20);
            res.render('./connections/edit', {connection});
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
}

exports.update = (req, res, next) =>{
    let connection = req.body;
    connection.startTime = connection.startTime+'Z'
    connection.endTime = connection.endTime+'Z'
    let id = req.params.id;
    model.findByIdAndUpdate(id,connection, {useFindAndModify: false, runValidators: true})
    .then(connection=>{
        if(connection){
            req.flash('success', 'You connection was sucessefully updated');
            res.redirect('/connections/'+id)
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status =  400;
        }
        next(err)
    })
}


