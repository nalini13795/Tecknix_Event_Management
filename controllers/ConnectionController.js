const express = require('express');
const model = require('../models/connection');

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
            console.log(connection.startTime)
            console.log(connection.endTime)
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

    let connection = new model(req.body);
    connection.save(connection)
    .then(()=>res.redirect('/connections'))
    .catchx(err=>{
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
    model.findOneAndDelete(id, {useFindAndModify: false})
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
