const router = require("express").Router();
const {
  getAllUser,
  createUser,
} = require("../../controllers/user-controllers");

router.route("/").get(getAllUser).post(createUser);

module.exports = router;
