// checkTokenMiddleware.js

// Middleware to check token
const checkToken = (req, res, next) => {
   if (!req.query.token) {
    return res.send({
        status: 0,
        msg: "Please fill the token"
    });
   }
   if (req.query.token !== process.env.MyToken) {
    return res.send({
        status: 0,
        msg: "Invalid token"
    });
   }
   next();
}

// Middleware to check pass
const checkPass = (req, res, next) => {
   if (!req.query.pass) {
    return res.send({
        status: 0,
        msg: "Please fill the pass"
    });
   }
   if (req.query.pass !== process.env.MyPass) {
    return res.send({
        status: 0,
        msg: "Invalid pass"
    });
   }
   next();
}

module.exports = { checkToken, checkPass };
