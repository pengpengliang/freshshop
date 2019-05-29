var express = require('express')
var router = express.Router(); //拿到express框架的路由
var mongoose = require('mongoose');
var Goods = require('../models/goods');

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
    Goods.find({}, function(err, doc) {
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

router.post("/delData", function(req, res, next) {
    var productId = req.body.productId;
    Goods.remove({
        productId: productId
    }, function(err, doc) {
        // console.log(doc.productId);

        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            })
        }
    });
});

router.post("/addData", function(req, res, next) {
    var addProduct = new Goods({
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImg: req.body.productImg,
        productIntro: req.body.productIntro
    });
    var productId = req.body.productId;
    Goods.find({ productId: productId }, function(err, doc) {
        console.log(666);

        if (doc.length > 0) {
            res.json({
                status: '1001',
                msg: '商品已存在',
                result: ''
            })
        } else {
            addProduct.save(function(err, doc) {
                if (err) {
                    res.json({
                        status: '1',
                        msg: err1.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '0',
                        msg: '',
                        result: ''
                    })
                }
            })
        }
    })

});

router.post("/editData", function(req, res, next) {
    var productId = req.body.productId,
        productName = req.body.productName,
        productPrice = req.body.productPrice,
        productImg = req.body.productImg,
        productIntro = req.body.productIntro

    Goods.update({ "productId": productId }, {
        $set: { 'productId': productId, 'productName': productName, 'productPrice': productPrice, 'productImg': productImg, 'productIntro': productIntro }
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            })
        }
    })
});

router.post("/findData", function(req, res, next) {
    var productId = req.body.productId;

    Goods.find({ "productId": productId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
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