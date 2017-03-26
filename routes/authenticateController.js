var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET auth page. */
router.get('/', function(req, res, next) {
    var user = {
        username : "test",
        email : "test@test.com"
    };
    var token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn : 4000
    });
    res.json({
        status : 1,
        token : token
    });
});

module.exports = router;
