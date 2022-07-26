const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/upload");
const router = express.Router();
const itemControllers = require("../controllers/item-controllers");

// Creates a new item
router.post(
  "/create",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 10 }),
    check("lPrice").not().isEmpty(),
    check("hPrice").not().isEmpty(),
    check("creator").not().isEmpty(),
    check("Metamask_add").not().isEmpty(),
  ],
  itemControllers.createItem
);
// For deleting item
router.delete("/item",itemControllers.deleteItem);
// Gets items listed by a particular user
router.post("/items",itemControllers.userItems);
// Gets item by id
router.get("/item/:id",itemControllers.itemById);
// Gets all items
router.get("/all",itemControllers.getItems);
// Gets image bt filename
router.get("/image/:filename", itemControllers.getImage);
//Deletes image by file id
router.post("/image/del/:id", itemControllers.deleteImage);
module.exports = router;
