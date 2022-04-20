const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placesSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'Name required']}, // need to fix for cafes of same name
    type: {type: String, required: [true, 'Type required']},
    address: {type: String, required: [true, 'Address required'], unique: true},
    updated: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Places', placesSchema)