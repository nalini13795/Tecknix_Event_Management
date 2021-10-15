const express = require('express');
const model = require('../models/connection');

const router = express.Router();


exports.newConnection = (req,res) =>{
    res.render('./connections/newConnection')
};

exports.Connections = (req,res) => {
    let connections = model.find();
    let topics = [...
        new Set(connections.map(
          (obj) => {
            return obj.topic
          })
    )];
    res.render('./connections/connections', {connections, topics})
};

exports.Connection = (req,res) => {
    res.render('./connections/connection')
};

exports.showByID = (req,res) => {
    let id = req.params.id
    let connection = model.findById(id)
    if(connection){
        res.render('./connections/connection',{connection})
    }else{
        let err = new Error('Cannot Find connection with id '+id);
        err.status = 404;
        next(err);
    }
}

exports.addConnection = (req,res) =>{
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections')
}

exports.delete = (req,res) =>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/connections');
    }else{
        let err = new Error('Cannot Find connection with id '+id);
        err.status = 404;
        next(err);
    }
}

exports.edit = (req,res) => {
    let id  = req.params.id;
    let connection = model.findById(id);
    res.render('./connections/edit',{connection})
}

exports.update = (req,res) =>{
    let id = req.params.id;
    let newConnection = req.body;
    if(model.updateByID(id,newConnection)){
        res.redirect('/connections/'+id);
    }else{
        let err = new Error('Cannot Find connection with id '+id);
        err.status = 404;
        next(err);
    }
}

exports.about = (req,res) => {
    res.render('about');
}

exports.contact = (req,res) => {
    res.render('contact');
}