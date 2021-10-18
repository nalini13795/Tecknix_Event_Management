const {DateTime} = require('luxon');
const {v4 :uuidv4} = require('uuid');

const connections = [
    {
        id : '1',
        topic : 'KNOWLEDGE EVENT',
        title :'Learn Python',
        host : 'Jordan',
        details : 'This is a basic level workshop where all the basics of python will be covered, no pre-requisite are required for this workshop. At the end of the workshop a small project will be given for practice.',
        where : 'Zoom',
        when : '2021-11-12',
        startTime : DateTime.local(2021,2,12,9,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime : DateTime.local(2021,2,12,15,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        imageURL : 'http://localhost:3000/images/python.jfif'
    },
    {
        id : '2',
        topic : 'KNOWLEDGE EVENT',
        title :'Learn NodeJs',
        host : 'Jordan',
        details : 'This is a basic level workshop where all the basics of python will be covered, no pre-requisite are required for this workshop. At the end of the workshop a small project will be given for practice.',
        where : 'Zoom',
        when :'2021-11-15',
        startTime : DateTime.local(2021,2,12,9,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime : DateTime.local(2021,2,12,15,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        imageURL : 'https://piyushvscode.gallerycdn.vsassets.io/extensions/piyushvscode/nodejs-snippets/0.0.2/1575178663150/Microsoft.VisualStudio.Services.Icons.Default'
    },
    {
        id : '3',
        topic : 'KNOWLEDGE EVENT',
        title :'Learn ReactJS',
        host : 'Timber',
        details : 'This is a basic level workshop where all the basics of python will be covered, no pre-requisite are required for this workshop. At the end of the workshop a small project will be given for practice.',
        where : 'Zoom',
        when :'2021-11-15',
        startTime : DateTime.local(2021,2,12,9,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime : DateTime.local(2021,2,12,15,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        imageURL : 'http://localhost:3000/images/reactjs.jpg'
    },
    {
        id : '4',
        topic : 'HR EVENT',
        title :'Dandiya Event',
        host : 'Nalini',
        details : 'This event is to celebrate the gujrati festival of NAVRATRI. There will snacks and dandiya available at the location please come enjoy a fun night with us.',
        where : 'Common room 2',
        when : '2021-12-26',
        startTime : DateTime.local(2021,2,12,9,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime : DateTime.local(2021,2,12,15,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        imageURL : 'https://i.pinimg.com/736x/0f/76/d0/0f76d0bffd7c7623eaa0ee6d9d40c583.jpg'
    },
    {
        id : '5',
        topic : 'HR EVENT',
        title :'Diwali Event',
        host : 'Ria',
        details : 'This event is to celebrate the gujrati festival of Diyas. There will snacks and dandiya available at the location please come enjoy a fun night with us.',
        where : 'Common room 2',
        when : '2021-12-26',
        startTime : DateTime.local(2021,2,12,9,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime : DateTime.local(2021,2,12,15,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        imageURL : 'http://localhost:3000/images/diwali.jfif'
    },
    {
        id : '6',
        topic : 'HR EVENT',
        title :'Holi Event',
        host : 'Gaurav',
        details : 'This event is to celebrate the gujrati festival of Holi. There will snacks and dandiya available at the location please come enjoy a fun night with us.',
        where : 'Common room 2',
        when : '2021-12-26',
        startTime : DateTime.local(2021,2,12,9,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        endTime : DateTime.local(2021,2,12,15,0).toLocaleString(DateTime.TIME_24_SIMPLE),
        imageURL : 'http://localhost:3000/images/holi.jfif'
    }
];

exports.find = function(){
    return connections;
};

exports.findById = function(id){
    return connections.find(connection => connection.id === id)
}

exports.save = function(connection){
    connection.id = uuidv4();
    connections.push(connection);
}

exports.deleteById = function(id){
    let index = connections.findIndex(connection => connection.id === id);
    if(index !== -1){
        connections.splice(index,1);
        return true;
    }else{
        return false;
    }
}

exports.updateByID = function(id, newConnection){
    let connection = connections.find(connection => connection.id === id);
    if(connection){
        connection.topic = newConnection.topic;
        connection.title = newConnection.title;
        connection.host = newConnection.host;
        connection.details = newConnection.details;
        connection.when = newConnection.when;
        connection.where = newConnection.where;
        connection.startTime = newConnection.startTime;
        connection.endTime = newConnection.endTime;
        connection.imageURL = newConnection.imageURL;
        return true;
    }else{
        return false;
    }
};