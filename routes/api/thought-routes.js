const router = require("express").Router();
const {
  getAllThought,
  createThought,
} = require("../../controllers/thought-controllers");

router.route("/").get(getAllThought).post(createThought);

module.exports = router;
