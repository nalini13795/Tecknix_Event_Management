const express = require('express');
const model = require('../models/connection');
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
    if(!id.match(/^[0-9a-f]{24}$/)){
        let err = new Error('Invalid connection id');
        err.status = 400;
        next(err);
    }
    model.findById(id)
    .then(connection=>{
        if(connection){
            connection =JSON.parse(JSON.stringify(connection)) 
            connection.when = JSON.stringify(connection.startTime).slice(1,11)
            connection.startTime = JSON.stringify(connection.startTime).slice(12,17);
            connection.endTime = JSON.stringify(connection.endTime).slice(12,17);
            res.render('./connections/connection',{connection})
        }else{
            let err = new Error('Cannot Find connection with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err))
}

exports.addConnection = (req, res, next) =>{
    console.log(req.body);
    if(req.body.startTime && req.body.endTime){
        req.body.startTime = req.body.startTime+'Z';
        req.body.endTime = req.body.endTime+'Z';
    }
    let connection = new model(req.body);

    if(DateTime.fromISO(req.body.startTime).ts > DateTime.fromISO(req.body.endTime).ts){
        req.flash('error', 'Invalid date and time, Start time should be smaller than end Time');  
        let err = new Error('Invalid date and time, Start time should be smaller than end Time');
        err.status = 400;
        next(err);
    }
    connection.save(connection)
    .then(()=>res.redirect('/connections'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status =  400;    
        }
        next(err);
    });
}

exports.delete = (req, res, next) =>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-f]{24}$/)){
        let err = new Error('Invalid connection id');
        err.status = 400;
        next(err);
    }
    model.findByIdAndRemove(id, {useFindAndModify: false})
    .then(connection=>{
        if(connection){
            res.redirect('/connections')
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
    if(!id.match(/^[0-9a-f]{24}$/)){
        let err = new Error('Invalid connection id');
        err.status = 400;
        next(err);
    }
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
    if(!id.match(/^[0-9a-f]{24}$/)){
        let err = new Error('Invalid connection id');
        err.status = 400;
        next(err);
    }
    model.findByIdAndUpdate(id,connection, {useFindAndModify: false, runValidators: true})
    .then(connection=>{
        if(connection){

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
