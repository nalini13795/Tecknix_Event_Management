const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const connectionRoute = require('./routes/connectionRoute')
const mainRoute = require('./routes/mainRoute')
const app = express();  
let host = 'localhost';
let port = 3000;

app.set('view engine','ejs');

mongoose.connect('mongodb://localhost:27017/tecknix', { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    })
})
.catch(err=>console.log(err.message));


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'))



app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/connections',connectionRoute);
app.use('/index', mainRoute);

app.use((req,res,next)=>{
    let err = new Error('Server cannot locate '+req.url);
    err.status = 404;
    next(err); 
});
app.use((err,req,res,next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status)
    res.render('error',{error : err});
});

