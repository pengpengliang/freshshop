var express = require('express');
var router = express.Router();
var Admins = require('./../models/admins');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post("/login", function(req, res, next) {
    var param = {
        adminName: req.body.adminName
    }
    var adminPwd = req.body.adminPwd;
    Admins.findOne(param, function(err, doc) {
        if (doc == null) {
            res.json({
                status: "1",
                msg: '用户名或密码错误',
                result: '登录失败'
            });
        } else {
            if (adminPwd != doc.adminPwd) {
                res.json({
                    status: "1",
                    msg: '用户名或密码错误',
                    result: '登录失败'
                });
            } else {
                if (doc) {
                    res.cookie("adminId", doc.adminId, {
                        path: '/',
                        maxAge: 1000 * 60 * 60
                    });
                    res.cookie("adminName", doc.adminName, {
                        path: '/',
                        maxAge: 1000 * 60 * 60
                    });
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            adminName: doc.adminName,
                            adminId: doc.adminId
                        }
                    });
                }
            }
        }



    })
});

router.post("/logout", function(req, res, next) {
    res.cookie("adminId", "", {
        path: '/',
        maxAge: -1
    });
    res.cookie("adminName", "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: ''

    })
})

module.exports = router;