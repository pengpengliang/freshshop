var express = require('express');
var router = express.Router();
var User = require('./../models/user')
require('./../until/util');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//注册
router.post("/reg", function(req, res, next) {
    var userForm = '100'
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var r3 = Math.floor(Math.random() * 10);
    var r4 = Math.floor(Math.random() * 10);
    var r5 = Math.floor(Math.random() * 10);
    var r6 = Math.floor(Math.random() * 10);
    var userId = userForm + r1 + r2 + r3 + r4 + r5 + r6;
    var person = new User({
        userId: userId,
        userName: req.body.userName,
        userPwd: req.body.userPwd
    })
    var userName = req.body.userName
    User.find({ userName: userName }, function(err, doc) {
        if (doc.length > 0) {
            res.json({
                status: '1001',
                msg: '用户名已注册',
                result: ''
            })
        } else {
            person.save(function(err, doc) {
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

})

//登录
router.post("/login", function(req, res, next) {
    var param = {
        userName: req.body.userName
    }
    var pwd = req.body.userPwd;
    User.findOne(param, function(err, doc) {
        if (pwd != doc.userPwd) {
            res.json({
                status: "1",
                msg: '用户名或密码错误',
                result: '登录失败'
            });
        } else {
            if (doc) {
                res.cookie("userId", doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.cookie("userName", doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                });
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName,
                        userId: doc.userId
                    }
                });
            }
        }


    })
})

//登出
router.post("/logout", function(req, res, next) {
    res.cookie("userId", "", {
        path: '/',
        maxAge: -1
    });
    res.cookie("userName", "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: ''

    })
})

//校验登录
router.get("/checkLogin", function(req, res, next) {

    if (req.cookies.userId) {

        res.json({
            status: '0',
            msg: '',
            result: {
                userName: req.cookies.userName || '',
                userId: req.cookies.userId
            }
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })

    }
})

//加入购物车
router.get("/cartList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({
        userId: userId
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: res.message,
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: doc.cartList
                })
            }
        }
    })
})

//购物车删除
router.post("/cartDel", function(req, res, next) {
    var userId = req.cookies.userId;
    var proID = req.body.proID;
    User.update({
        userId: userId
    }, {
        $pull: {
            'cartList': {
                'proID': proID
            }
        }
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
})

//购物车修改
router.post("/cartEdit", function(req, res, next) {
    var userId = req.cookies.userId,
        proID = req.body.proID,
        proNum = req.body.proNum,
        checked = req.body.checked;

    User.update({ "userId": userId, "cartList.proID": proID }, {
        $set: { 'cartList.$.proNum': proNum, 'cartList.$.checked': checked }
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
    })
})

//购物车选中
router.post("/editCheckAll", function(req, res, next) {
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll ? '1' : '0';
    User.findOne({ userId: userId }, function(err, user) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (user) {
                user.cartList.forEach((item) => {
                    item.checked = checkAll;
                });
                user.save(function(err1, doc) {
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
                            result: 'suc'
                        })
                    }
                })
            }

        }
    })
})

//添加地址
router.post("/addAddress", function(req, res, next) {
    var userId = req.cookies.userId;
    var userForm = '100'
    var r1 = Math.floor(Math.random() * 10);
    var r2 = Math.floor(Math.random() * 10);
    var sysDate = new Date().Format('yyyyMMddhhmmss');
    var addressId = userForm + r1 + sysDate + r2;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var addressList = doc.addressList;
            var nameInfo = req.body.nameInfo;
            var phone = req.body.phone;
            var address = req.body.address;
            if (addressList.length == 0) {
                var addressInfo = {
                    userName: req.body.nameInfo,
                    tel: req.body.phone,
                    streetName: req.body.address,
                    isDefault: true,
                    addressId: addressId
                };
                addressList.push(addressInfo);
                doc.save(function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: err1.message,
                            result: ''
                        })
                    } else {
                        // console.log(doc1);

                        res.json({
                            status: "0",
                            msg: '',
                            result: 'succeed'
                        })
                    }
                })
            } else {
                var addressInfo = {
                    userName: req.body.nameInfo,
                    tel: req.body.phone,
                    streetName: req.body.address,
                    isDefault: false,
                    addressId: addressId
                };
                var bool = false
                addressList.forEach((item) => {
                    if (item.userName == nameInfo && item.tel == phone && item.streetName == address) {
                        bool = true;
                        return;
                    } else {
                        bool = false;
                    }
                    console.log("循环内" + bool);

                });
                console.log("循环外" + bool);
                if (bool == true) {
                    res.json({
                        status: '1001',
                        msg: "地址已存在",
                        result: ''
                    });
                } else {
                    addressList.push(addressInfo);

                    doc.save(function(err1, doc1) {
                        if (err1) {
                            res.json({
                                status: "1",
                                msg: err1.message,
                                result: ''
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



        }
    })
})

//渲染地址列表
router.get("/addressList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
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
                result: doc.addressList
            })
        }
    })
})

//设置默认地址
router.post("/setDefault", function(req, res, next) {
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;
    if (!addressId) {
        res.json({
            status: '1003',
            msg: '地址不存在',
            result: ''
        })
    } else {
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                var addressList = doc.addressList;
                addressList.forEach((item) => {
                    if (item.addressId == addressId) {
                        item.isDefault = true;
                    } else {
                        item.isDefault = false;

                    }
                });

                doc.save(function(err1, doc1) {
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
                });
            }
        })
    }

})

//删除地址
router.post("/delAddress", function(req, res, next) {
    var userId = req.cookies.userId;
    var addressId = req.body.addressId;
    User.update({
        userId: userId
    }, {
        $pull: {
            'addressList': {
                'addressId': addressId
            }
        }
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
    });
})

router.post("/payMent", function(req, res, next) {
    var userId = req.cookies.userId;
    var orderTotal = req.body.orderTotal;
    var addressId = req.body.addressId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var address = '';
            var goodsList = []
                //获取当前用户的地址信息
            doc.addressList.forEach((item) => {
                if (addressId == item.addressId) {
                    address = item;
                }
            });
            //获取用户购物车的购买商品
            doc.cartList.filter((item) => {
                if (item.checked == '1') {
                    goodsList.push(item);
                }
            });

            var plateForm = '888'
            var r1 = Math.floor(Math.random() * 10);
            var r2 = Math.floor(Math.random() * 10);

            var sysDate = new Date().Format('yyyyMMddhhmmss');
            var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            var orderId = plateForm + r1 + sysDate + r2;

            var order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                createDate: createDate
            }
            doc.orderList.push(order);

            doc.save(function(err1, doc1) {
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
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                    })
                }
            })
        }
    })
})


router.get("/orderDetail", function(req, res, next) {
    var userId = req.cookies.userId;
    var orderId = req.query.orderId;
    User.findOne({ userId: userId }, function(err, userInfo) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var orderList = userInfo.orderList;
            if (orderList.length > 0) {
                var orderTotal = 0;
                var goodsList = [];
                var createDate = '';
                var addressInfo = [];
                orderList.forEach((item) => {
                    if (item.orderId == orderId) {
                        orderTotal = item.orderTotal;
                        goodsList = item.goodsList;
                        createDate = item.createDate;
                        addressInfo = item.addressInfo
                    }
                });

                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        orderId: orderId,
                        orderTotal: orderTotal,
                        goodsList: goodsList,
                        createDate: createDate,
                        addressInfo: addressInfo
                    }
                })
            } else {
                res.json({
                    status: '12001',
                    msg: '无此订单',
                    result: ''
                })

            }

        }
    })
})

router.get("/getCartCount", function(req, res, next) {
    if (req.cookies && req.cookies.userId) {
        var userId = req.cookies.userId;

        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                });
            } else {
                var cartList = doc.cartList;
                let carCount = 0;

                cartList.map(function(item) {
                    carCount += parseInt(item.proNum);
                })

                res.json({
                    status: '0',
                    msg: '',
                    result: carCount
                })
            }
        })
    }
})
module.exports = router;