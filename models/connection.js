// const {DateTime} = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    topic : {type: String, required:[true, 'Topic is required']},
    title : {type: String, required:[true, 'Title is required']},
    host : {type: String, required:[true, 'Host is required']},
    details : {
        type: String, 
        required:[true, 'Details is required'],
        minLength: [10, 'Minimum charecter should be 10']
    },
    where : {type: String, required:[true, 'Location is required']},
    // when : {type: Date, required:[true, 'Date is required']},
    startTime : {type: Date, required:[true, 'startTime is required']},
    endTime : {type: Date, required:[true, 'endTime is required']},
    imageURL : {type: String}
}, {timestamps: true}
)

module.exports = mongoose.model('connection', connectionSchema);

// exports.find = function(){
//     return connections;
// };

// exports.findById = function(id){
//     return connections.find(connection => connection.id === id)
// }

// exports.save = function(connection){
//     connection.id = uuidv4();
//     connections.push(connection);
// }

// exports.deleteById = function(id){
//     let index = connections.findIndex(connection => connection.id === id);
//     if(index !== -1){
//         connections.splice(index,1);
//         return true;
//     }else{
//         return false;
//     }
// }

// exports.updateByID = function(id, newConnection){
//     let connection = connections.find(connection => connection.id === id);
//     if(connection){
//         connection.topic = newConnection.topic;
//         connection.title = newConnection.title;
//         connection.host = newConnection.host;
//         connection.details = newConnection.details;
//         connection.when = newConnection.when;
//         connection.where = newConnection.where;
//         connection.startTime = newConnection.startTime;
//         connection.endTime = newConnection.endTime;
//         connection.imageURL = newConnection.imageURL;
//         return true;
//     }else{
//         return false;
//     }
// };