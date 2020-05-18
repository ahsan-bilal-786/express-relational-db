var express = require("express");
var { createUser } = require("../controllers/user");
var router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

router.post("/", createUser);

module.exports = router;
