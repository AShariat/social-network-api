const router = require("express").Router();
const { getAllUser } = require("../../controllers/user-controllers");

router.route("/").get(getAllUser);

module.exports = router;
