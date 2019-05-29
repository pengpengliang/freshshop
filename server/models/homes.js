var mongoose = require('mongoose');

var Schema = mongoose.Schema; //Schema模型定义数据

var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "productPrice": String,
    "productImg": String,
    "proSale": Number,
    "productIntro": String
})

module.exports = mongoose.model('Home', productSchema); //Good的模型就是上面定义的Schema