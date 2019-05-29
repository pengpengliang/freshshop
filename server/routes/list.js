var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Lists = require('../models/lists');

mongoose.connect('mongodb://127.0.0.1:27017/shop'); //连接数据库

//监听数据库连接情况
mongoose.connection.on("connected", function() {
    console.log("MongoDB connected success.");

});

mongoose.connection.on("error", function() {
    console.log("MongoDB connected failed.");

});

mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connected disconnected.");

});

//实现路由 获取express二级路由
router.get("/", function(req, res, next) {

     var page = parseInt(req.query.page); 
    
     var pageSize = parseInt(req.query.pageSize); 

    // var sort = req.query.sort; 

     var skip = (page - 1) * pageSize;

    var params = {};

    var listsModel = Lists.find(params).skip(skip).limit(pageSize); 

    // listsModel.sort({ 'proPrice': sort });

    listsModel.exec(function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }

    })
});

module.exports = router;