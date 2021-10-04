const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override')
const connectionRoute = require('./routes/connectionRoute')
const app = express();  
let host = 'localhost';
let port = 3000;

app.set('view engine','ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'))



app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/connections',connectionRoute);

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

app.listen(port, host, ()=>{
    console.log('App running on the port ',port);
})