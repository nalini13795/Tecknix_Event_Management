const express = require('express');
// const model = require('../models/connection');

const router = express.Router();


exports.newConnection = (req,res) =>{
    res.render('./connections/newConnection')
};

exports.Connections = (req,res) => {
    res.render('./connections/connections')
};

exports.Connection = (req,res) => {
    res.render('./connections/connection')
};