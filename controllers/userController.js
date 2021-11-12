const express = require('express');


exports.login = (req,res) => {
    res.render('./user/login');
}

exports.signup = (req,res) => {
    res.render('./user/new');
}
exports.profile = (req,res) => {
    res.render('./user/profile');
}
