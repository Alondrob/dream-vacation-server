const { json } = require("body-parser");
const { distructObj, bookedDates } = require("../helpers/distruct");
const dotnev = require("dotenv");
const PropertyModel = require("../models/Property");
const UserModel = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile, getFileStream } = require("../middleware/s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
dotnev.config();

const getAllProperties = async (req, res) => {
  const properties = await PropertyModel.find().exec();
  res.json({ properties: properties });
};

const getProperty = async (req, res) => {
  const id = req.params.id;
  const property = await PropertyModel.findById(id).exec();
  res.json({ property: property });
};

const createProperty = async (req, res) => {
  ("hitting the route", req.user )
  const user = await UserModel.findOne({ email: req.user.email });
  const newInstanceData = distructObj(req.body, user);
  const property = new PropertyModel(newInstanceData);
  ("property", ( property))
  user.properties.push(property);
  ("user-properties", user.properties)
  user.is_host = true;
  try {
    await property.save();
    await user.update(user);
    res.status(201).json({ property: property });
  } catch (err) {
    res.status(400).json({ error: "what is the errror" });
  }
};

const editProperty = async (req, res) => {
  const user = await UserModel.findOne({ email: req.user.email });
  const foundProperty = await PropertyModel.findById(req.body.id).exec();
  const newInstanceData = distructObj(req.body, user);
  await foundProperty?.update(newInstanceData);

  try {
    await foundProperty.save();
    res.status(201).json({ property: foundProperty });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteProperty = async (req, res) => {
  const property = await PropertyModel.findById(req.params.id).exec();

  try {
    await property?.remove();
    res.json("Property Was Deleted");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const bookProperty = async (req, res) => {
  ("hitting the route")
  const user = await UserModel.findById(req.user._id).exec();
  const property = await PropertyModel.findById(req.body.id).exec();
  const bookedDatesArray = bookedDates(req.body.fromDate, req.body.toDate);
  property.booking.bookedBy = req.user;
  property.booking.dates = bookedDatesArray;
  user.bookings.push({ place: property, dates: bookedDatesArray });
  // user && (user.bookings.place = property);
  try {
    await property.save();
    await user.save();
    res.status(201).json({ property: property });
  } catch (err) {
    res.status(400).json({ error: "what is the errror" });
  }
};

const saveProperty = async (req, res) => {
  const body = req.body;
  const foundProperty = await PropertyModel.findById(body.id).exec();
  if (!foundProperty) {
    return res.json({ error: "not found" });
  }
  foundProperty.name = body.name;
  foundProperty.price = body.price;
  try {
    await foundProperty.save();
    res.json(foundProperty);
  } catch (err) {
    console.error(err);
    res.json({ error: err.message });
  }
};

const getSignedUrl = async (req, res) => {
  ("hitting the route");
  const data = await generateUploadUrl();
  ("Url", data);
  res.json({ data: data });
};

const uploadImage = async (req, res) => {
  // ("getting here!")
  // ("reqeust", req.body.property_id)
  const property = await PropertyModel.findById(req.body.property_id).exec();
  ("selected", property)
  const file = req.file;
  const result = await uploadFile(file);
  ("aws-url", result.Location)
  property.image.push(result.Location);
  await property.save();
  await unlinkFile(file.path)
  res.send(result);
};

const getImages = async (req, res) => {
  ("hitting the route");
  (req.params)
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
};

//

module.exports = {
  getAllProperties,
  getProperty,
  createProperty,
  editProperty,
  deleteProperty,
  saveProperty,
  bookProperty,
  getSignedUrl,
  uploadImage,
  getImages,
};
