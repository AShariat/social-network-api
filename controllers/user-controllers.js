const { User, Thought } = require("../models");
const { exists } = require("../models/User");

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: ["-__v", "-username"],
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: ["-__v", "-username"],
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User Found With This ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User Found With This ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User Found With This ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params, body }, res) {
    User.findById(body)
      .then((dbUserData) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: dbUserData } },
          { new: true }
        );
      })
      .then(() =>
        res.json({ message: "Your New Friend Has Been Added Successfully!" })
      )
      .catch((err) => res.status(400).json(err));
  },

  removeFriend({ params }, res) {
    User.findById(params.friendId)
      .then((dbUserData) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: dbUserData } },
          { new: true }
        );
      })
      .then(() =>
        res.json({ message: "Your Friend Has Been Removed Successfully!" })
      )
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
