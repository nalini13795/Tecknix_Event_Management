const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    connection: {type: Schema.Types.ObjectId, ref: 'Connection', required: [true, 'Connection is required']},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'User is required']},
    rsvp: {type: String, required: [true, 'value is required'] },
    }, {timestamps: true}
);

module.exports = mongoose.model('Rsvp', rsvpSchema);
