const {body, validationResult, param} = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateRsvp = (req, res, next)=>{
    let resp = req.params.value;
    //an objectId is a 24-bit Hex string
    resp = resp.toLowerCase();
    if(resp === 'yes' || resp === 'no' || resp === 'maybe'){
        return next();
    } else {
        let err = new Error('Invalid value for RSVP');
        err.status = 400;
        return next(err);
    }
};


exports.validateSignup = [
    body('firstName', 'First name cannnot be empty').notEmpty().trim().escape(),
    body('lastName', 'Last name cannnot be empty').notEmpty().trim().escape(),
    body('email','Email must be a valid email id').isEmail().trim().escape().normalizeEmail(),
    body('password','Password must be minimum of 8 charecters and maximum 64 charecters').isLength({min: 8, max: 64}).escape(),
]

exports.validateLogin = [
    body('email','Email must be a valid email id').isEmail().trim().escape().normalizeEmail(),
    body('password','Password must be minimum of 8 charecters and maximum 64 charecters').isLength({min: 8, max: 64}).escape()
]

exports.validateConn = [
    body('title', 'Title cannot be empty').notEmpty().trim().escape(),
    body('details', 'Content has to be minimum of 10 charecters').isLength({min: 10}).trim().escape(),
    body('topic', 'Topic cannot be empty').notEmpty().escape(),
    body('where', 'Where cannot be empty').notEmpty().escape(),
    body('startTime', 'startTime cannot be empty').notEmpty(),
    body('endTime', 'endTime cannot be empty').notEmpty(),
    body('imageURL', 'imageURL cannot be empty').notEmpty().escape()
]

exports.validateResult = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(err=>{
            req.flash('error',err.msg);
        })
        return res.redirect('back');
    }else{
        return next();
    }
}