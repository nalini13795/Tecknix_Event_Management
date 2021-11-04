const express = require('express');
const model = require('../models/connection');
const router = express.Router();


exports.about = (req,res) => {
    res.render('about');
}

exports.contact = (req,res) => {
    res.render('contact');
}

exports.index = (req,res)=>{
    res.render('index')
}
