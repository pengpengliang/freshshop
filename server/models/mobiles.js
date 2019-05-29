var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var listSchema = new Schema({
    "proID": String,
    "proName": String,
    "proPrice": Number,
    "proImg": String,
    "proSale": Number,
    "proNum":String,
    "checked":String
})

module.exports = mongoose.model('Mobile', listSchema);