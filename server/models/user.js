var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [{
            "proID": String,
            "proName": String,
            "proPrice": String,
            "proImg": String,
            "checked": String,
            "proNum": String
        }

    ],
    "addressList": [{
        "addressId": String,
        "userName": String,
        "streetName": String,
        "tel": String,
        "isDefault": Boolean
    }]

});

module.exports = mongoose.model("User", userSchema);