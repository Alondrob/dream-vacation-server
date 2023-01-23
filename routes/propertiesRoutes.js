const {
  getAllProperties,
  getProperty,
  getUserProperties,
  createProperty, 
  editProperty,
  deleteProperty,
  saveProperty, 
  bookProperty,
  getSignedUrl,
  uploadImage,
  getImages,
} = require("../controllers/propertyController");
const s3 = require("../middleware/s3");


const { loggedInMiddleware } = require("../middleware/loggedInMidellware");

const express = require("express");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

router.get("/", getAllProperties);
router.get("/get-signed-url", getSignedUrl);
router.get("/:id", getProperty);
router.post("/create-property",loggedInMiddleware, createProperty);

router.put("/edit-property",loggedInMiddleware, editProperty);
router.delete("/delete-property/:id",loggedInMiddleware, deleteProperty);
router.post("/book-property",loggedInMiddleware, bookProperty);
router.post("/save-property", loggedInMiddleware, saveProperty);
router.post("/images",loggedInMiddleware, upload.single('file'), uploadImage);
router.get("/images/:key", getImages);





module.exports = router;
