const express = require("express");
const { check } = require("express-validator");

const UserController = require("../controllers/user-controllers");

const router = express.Router();

// For logging of user
router.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  UserController.userLogin
);
// For signup of user
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  UserController.userSignup
);
// Gets user item by id
router.post(
  "/userItem",
  [check("email").not().isEmpty()],
  UserController.getUserItems
);
// Adds to wishlist of user
router.post(
  "/wishlist",
  [check("wishlistid").not().isEmpty()],
  UserController.addwishlist
);
// Removes from wishlist of user
router.patch(
  "/wishlist",
  [check("wishlistid").not().isEmpty()],
  UserController.removewishlist
);
// Gets wishlist of user
router.get(
  "/wishlist",
  UserController.getwishlist
);
// Registers transaction of user
router.post(
  "/transaction",
  UserController.addTransaction
);
module.exports = router;
