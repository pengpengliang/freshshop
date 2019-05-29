var express = require('express');
var router = express.Router(); //获取路由
var mongoose = require('mongoose');
var Lists = require('../models/wines');

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

    // var page = parseInt(req.query.page);

    // var pageSize = parseInt(req.query.pageSize);

    // var sort = req.query.sort;

    // var skip = (page - 1) * pageSize;

    var params = {};

    // var listsModel = Lists.find(params).skip(skip).limit(pageSize);

    var listsModel = Lists.find(params);


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

router.get("/price", function(req, res, next) {

    var page = parseInt(req.query.page);

    var pageSize = parseInt(req.query.pageSize);

    var sort = req.query.sort;

    var skip = (page - 1) * pageSize;

    var params = {};

    var listsModel = Lists.find(params).skip(skip).limit(pageSize);

    listsModel.sort({ 'proPrice': sort });

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

})

router.get("/sale", function(req, res, next) {

    var pages = parseInt(req.query.pages);

    var pageSizes = parseInt(req.query.pageSizes);

    var sorts = req.query.sorts;

    var skips = (pages - 1) * pageSizes;

    var params = {};

    var listsModel = Lists.find(params).skip(skips).limit(pageSizes);

    listsModel.sort({ 'proSale': sorts });

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

})

//加入购物车
router.post("/addCart", function(req, res, next) {
    var userId = req.body.userId;
    var proID = req.body.proID;
    var User = require('../models/user');

    User.findOne({
        userId: userId
    }, function(err, userDoc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            // console.log("userDoc" + userDoc);
            if (userDoc) {
                let goodsItem = '';
                userDoc.cartList.forEach((item) => {
                    if (item.proID == proID) {
                        goodsItem = item;
                        item.proNum++;
                    }
                });
                if (goodsItem) {
                    userDoc.save(function(err2, doc2) {
                        if (err2) {
                            res.json({
                                status: "1",
                                msg: err2.message
                            })
                        } else {
                            res.json({
                                status: "0",
                                msg: '',
                                result: 'succeed'
                            })
                        }

                    })
                } else {
                    Lists.findOne({
                        proID: proID
                    }, function(err1, doc) {
                        if (err1) {
                            res.json({
                                status: "1",
                                msg: err1.message
                            })
                        } else {
                            if (doc) {

                                doc.proNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save(function(err2, doc2) {
                                    if (err2) {
                                        res.json({
                                            status: "1",
                                            msg: err2.message
                                        })
                                    } else {
                                        res.json({
                                            status: "0",
                                            msg: '',
                                            result: 'succeed'
                                        })
                                    }

                                })
                            }
                        }
                    });
                }

            }
        }
    })
});

router.post("/delData", function(req, res, next) {
    var proID = req.body.proID;
    Lists.remove({
        proID: proID
    }, function(err, doc) {
        // console.log(doc);

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
    var addProduct = new Lists({
        proID: req.body.proID,
        proName: req.body.proName,
        proPrice: req.body.proPrice,
        proImg: req.body.proImg
    });
    var proID = req.body.proID;
    Lists.find({ proID: proID }, function(err, doc) {
        if (doc.length > 0) {
            res.json({
                status: '1001',
                msg: '商品已存在',
                result: ''
            })
        } else {
            addProduct.save(function(err1, doc) {
                if (err1) {
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
    var proID = req.body.proID,
        proName = req.body.proName,
        proPrice = req.body.proPrice,
        proImg = req.body.proImg

    Lists.update({ "proID": proID }, {
        $set: { 'proID': proID, 'proName': proName, 'proPrice': proPrice, 'proImg': proImg }
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
    var proId = req.body.proID;

    Lists.find({ "proID": proId }, function(err, doc) {
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