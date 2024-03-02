const mongoose = require('mongoose');
// const {Schema} = mongoose;

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    organizedBy: String,
    eventDate: Date,
    eventTime: String,
    location: String,
    attendees: Number,
    ticketPrice: Number,
    image: String,
    
 });
 
 const Event = mongoose.model("Event", eventSchema);
    module.exports = Event;