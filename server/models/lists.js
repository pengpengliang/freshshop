var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var listSchema = new Schema({
    "proID": String,
    "proName": String,
    "proPrice": Number,
    "proImg": String,
    "proSale": Number
})

module.exports = mongoose.model('List', listSchema); 

