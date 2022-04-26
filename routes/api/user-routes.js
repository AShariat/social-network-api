const router = require("express").Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controllers");

router.route("/").get(getAllUser).post(createUser);
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/:userId/friends").put(addFriend);
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
