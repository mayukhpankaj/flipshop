const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/users");
const Transaction = require("../models/transactions");
const bcrypt = require("bcryptjs");

// User login logic
const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    next(
      new HttpError("Could not log you in,please check and try again ", 500)
    );
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    wishlist: existingUser.wishlist,
    items: existingUser.items,
  });
};

// User signup logic
const userSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 15);
  } catch (err) {
    next(new HttpError("Hashing password failed!!", 500));
  }
  const createdUser = new User({
    name,
    email,
    wishlist: [],
    password: hashedPassword,
    items: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    wishlist: createdUser.wishlist,
    items: createdUser.items,
  });
};
// Gets items of the user
const getUserItems = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { username } = req.body;
  let existingUser;
  try {
    existingUser = await findById(req.userData.userId);
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  res.status(200).json({
    items: existingUser.items,
    wishlist: existingUser.wishlist,
  });
};
// Adds to wishlist of user
const addwishlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { wishlistid,creator } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  let wishlistArray = existingUser.wishlist;
  wishlistArray.push(wishlistid);
  existingUser.wishlist = wishlistArray;
  try {
    await existingUser.save();
  } catch (err) {
    return next(new HttpError("Item could not be added to wishlist!!", 500));
  }
  res.status(201).json({
    items: existingUser.items,
    wishlist: existingUser.wishlist,
  });
};
// Removes from wishlist of user
const removewishlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { wishlistid,creator } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  let wishlistArray = existingUser.wishlist;
  wishlistArray = wishlistArray.filter((item) => item !== wishlistid);
  existingUser.wishlist = wishlistArray;
  try {
    await existingUser.save();
  } catch (err) {
    return next(
      new HttpError("Item could not be removed from wishlist!!", 500)
    );
  }
  res.status(200).json({
    items: existingUser.items,
    wishlist: existingUser.wishlist,
  });
};
// Gets the wishlist of user
const getwishlist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {creator} = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("User could not be fetched", 404));
  }
  res.status(200).json({
    wishlist: existingUser.wishlist,
  });
};
// Adds transaction details in database
const addTransaction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { hash,creator,PurchaseDate } = req.body;
  const newTransaction = new Transaction({
    hash,
    userId: creator,
    PurchaseDate
  });
  try {
    await newTransaction.save();
  } catch (err) {
    const error = new HttpError(
      "Saving transaction, please try again later.",
      500
    );
    return next(error);
  }
  res.status(200).json({
    "Message":"Success"
  });
};
exports.getUserItems = getUserItems;
exports.getwishlist = getwishlist;
exports.removewishlist = removewishlist;
exports.addwishlist = addwishlist;
exports.userLogin = userLogin;
exports.userSignup = userSignup;
exports.addTransaction = addTransaction;